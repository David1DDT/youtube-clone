import { Request, Response } from "express"
import { findUserByEmail } from "../user/user.service"
import { StatusCodes } from "http-status-codes"
import { sign } from "jsonwebtoken"
import { signJwt } from "./auth.utils"
import { omit } from "../../helpers/omit"
import { LoginBody } from "./auth.schema"

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
    const { email, password } = req.body

    const user = await findUserByEmail(email)

    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .send("Invalid email or password")
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .send("Invalid email or password")
    }


    // @ts-ignore
    const payload = omit(user.toObject(), "password")// toJSON is made by mongoose/typegoose 
    const token = signJwt(payload)

    res.cookie("accessToken", token, {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        sameSite: "lax",
        secure: false
    })

    return res.status(StatusCodes.OK).send(token)
}


export const logoutHandler = (req: Request, res: Response) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        sameSite: "lax",
        secure: true
    })
    return res.json({ message: "Logged out" })
}