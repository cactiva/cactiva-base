import { db } from "../libs/controllers/JwtController";
import { jwtMgr } from "../libs/controllers/JwtController";
import { JwtController as Base } from "../libs/controllers/JwtController";
import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import * as Password from "node-php-password";
import { FORBIDDEN, OK } from "http-status-codes";

@Controller("api/jwt")
export class JwtController extends Base {
    //   @Post("login")
    //   protected async login(req: Request, res: Response) {
    //     const users = await db.any(
    //       "SELECT * FROM public.p_user WHERE username like $1 ",
    //       [req.body.username]
    //     );
    //     if (users.length > 0) {
    //       if (Password.verify(req.body.password, users[0].password)) {
    //         const u = users[0];
    //         const jwtStr = jwtMgr.jwt({
    //           ...u,
    //           time: new Date().toString(),
    //           "https://hasura.io/jwt/claims": {
    //             "x-hasura-allowed-roles": [u.role],
    //             "x-hasura-default-role": u.role,
    //             "x-hasura-user-id": u.id.toString()
    //           }
    //         });
    //         return res.status(OK).send({ jwt: jwtStr, user: u });
    //       }
    //     }

    //     return res.status(FORBIDDEN).json({
    //       reason: "Username and/or password does not found"
    //     });
    //   }
    @Get("login")
    protected async login(req: Request, res: Response) {
        const user = {
            fullname: "Demo",
            role: "sales",
            id: 1
        }
        const jwtStr = jwtMgr.jwt({
            ...user,
            time: new Date().toString(),
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": [user.role],
                "x-hasura-default-role": user.role,
                "x-hasura-user-id": user.id.toString()
            }
        });
        return res.status(OK).send(jwtStr);
    }
}
