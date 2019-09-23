const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, Object.assign({}, argv));
  // Customize the config before returning it.
  config.devServer.port = 19100;

  return config;
};
