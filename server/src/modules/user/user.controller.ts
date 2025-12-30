import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { creteUser } from "./user.service";
import { RegiserUserBody } from "./user.schema";


export async function registerUserHandler(req: Request<{}, {}, RegiserUserBody>, res: Response) {
    const { username, email, password } = req.body

    try {
        await creteUser({ username, email, password })//create user
        return res.status(StatusCodes.CREATED).send("user created succesfully")
    } catch (e: any) {
        if (e.code = 11000) {
            console.log(e)
            return res.status(StatusCodes.CONFLICT).send("User already exists")
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message)
    }
}