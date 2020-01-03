let package = require("./package.json");
const efs = require("fs");
const { spawn } = require('child_process');
const deps = {
    "spinnies": "^0.5.1",
    "execa": "^4.0.0",
    "fs-jetpack": "^2.2.3",
}
let install = false;
let pd = package.devDependencies
if (!pd) {
    package.devDependencies = {};
    pd = package.devDependencies;
}
for (let i in deps) {
    const d = deps[i];
    if (!pd[i]) {
        pd[i] = d;
        install = true;
    }
}

if (!package.scripts.dev) {
    package.scripts.dev = "node dev.js";
}
if (install) {
    console.log('Installing yarn dev');
    efs.writeFileSync('package.json', JSON.stringify(package, null, 2));
    const ls = spawn('yarn');
    ls.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    ls.stderr.on('data', (data) => {
        console.error(data.toString());
    });
    ls.on('close', (code) => {
        console.log('Done, yarn dev installed.')
    });
    return;
}


const execa = require("execa");
const fs = require("fs-jetpack");
const settings = require("./settings.json");
const pweb = require("./src/libs/package.web.json");
const pmobile = require("./src/libs/package.mobile.json");
const Spinnies = require("spinnies");

const exec = async (command, options) => {
    const args = command.split(" ");
    const cmd = args.shift();
    const opt = options && options.out ? { stdout: 'inherit', stderr: 'inherit' } : {};
    if (typeof options === "string") {
        opt.cwd = options;
    }
    if (options && options.cwd) {
        opt.cwd = options.cwd;
    }
    const ex = execa(cmd, args, { ...opt });


    if (options && options.callback) {
        options.callback(ex);
    }

    await ex;
};
const spinner = new Spinnies();
let mode = ''
if (!package.cactiva) {
    mode = 'web';
    package.cactiva = {
        mode: 'web',
        dependencies: {}
    }
} else {
    mode = package.cactiva.mode;
}

if (!package.cactiva.dependencies) {
    package.cactiva.dependencies = {};
}

let def = pweb;
if (mode === 'mobile') {
    def = pmobile;
}

if (process.argv.length > 2) {
    (async () => {
        console.log(`Processing ${settings.name} - ${mode}`);
        await exec(`yarn ${process.argv.splice(2).join(' ')}`, { out: true });
        setTimeout(async () => {
            package = JSON.parse(await fs.readAsync("package.json"));
            for (let i in package.dependencies) {
                if (!def.dependencies[i]) {
                    package.cactiva.dependencies[i] = package.dependencies[i];
                }
            }
            efs.writeFileSync('package.json', JSON.stringify(package, null, 2));
        }, 1000);
    })();
    return;
}

spinner.add('s1', { text: 'Preparing ${settings.name}...' });
(async () => {
    if (!await fs.existsAsync("src/libs/store.ts")) {
        spinner.update('s1', { text: "Cloning cactiva-libs..." });
        await fs.removeAsync("src/libs");
        await exec("git clone https://github.com/cactiva/cactiva-libs libs", "src");
    }

    if (!await fs.existsAsync("backend")) {
        spinner.update('s1', { text: "Cloning cactiva-backend..." });
        await exec("git clone https://github.com/cactiva/cactiva-base base");
        await fs.moveAsync("base/backend", "backend")
        await fs.removeAsync("base");
    }

    if (!await fs.existsAsync("backend/libs")) {
        spinner.update('s1', { text: "Cloning cactiva-backend-libs..." });
        await exec("git clone https://github.com/cactiva/cactiva-backend libs", "backend");
    }

    efs.chmodSync('backend/hasura', 0o755);

    spinner.update('s1', { text: "Running yarn on backend" });
    await exec("yarn", "backend");

    spinner.update('s1', { text: `Updating ${settings.name} dependencies ` });


    package.dependencies = def.dependencies;
    package.devDependencies = def.devDependencies;

    if (package.cactiva && package.cactiva.package) {
        for (let i in package.cactiva.package) {
            const p = package.cactiva.package[i];
            package.dependencies[i] = p;
        }
    }
    efs.writeFileSync('package.json', JSON.stringify(package, null, 2));

    spinner.update('s1', { text: `Running yarn on ${settings.name} ` });
    await exec("yarn");

    let expo, backend;
    spinner.update('s1', { text: 'Running Expo' });
    exec("yarn web", {
        callback: (p) => {
            p.stderr.on('data', e => {
                spinner.update('s1', { text: 'EXPOWEB: ' + e.toString().trim() });
            })
            p.stdout.on('data', e => {
                spinner.update('s1', { text: 'EXPOWEB: ' + e.toString().trim() });
            })
            expo = p;
        }
    });
    spinner.add('s2', { text: 'Running Backend' });
    exec("yarn dev", {
        cwd: "backend",
        callback: (p) => {
            p.stdout.on('data', e => {
                spinner.update('s2', { text: 'BACKEND: ' + e.toString().trim() });
            })
            p.stderr.on('data', e => {
                spinner.update('s2', { text: 'BACKEND: ' + e.toString().trim() });
            })
            backend = p;
        }
    });
    process.on('SIGINT', function () {
        if (expo) {
            expo.kill();
        }

        if (backend) {
            backend.kill();
        }

        process.exit();
    });
    await Promise.all([expo, backend]);
})();

