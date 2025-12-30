// gets the cookie and returns a user object

import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../modules/auth/auth.utils";

function deserializeUser(req: Request, res: Response, next: NextFunction) {


    const accessToken = (req.headers.authorization || req.cookies.accessToken || "").replace(/^Bearer\s/, '') // replaces Bearer and any space or tab with ''

    if (!accessToken) {
        return next()
    }

    const decoded = verifyJwt(accessToken)

    if (decoded) {
        res.locals.user = decoded // you can use req.user
    }

    return next()
}

export default deserializeUser