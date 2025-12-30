import jwt, { SignOptions } from "jsonwebtoken" // to login

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"
const EXPIRES_IN = "1h"

export function signJwt(payload: Record<string, any>) {
    const options: SignOptions = { expiresIn: EXPIRES_IN }
    return jwt.sign(payload, JWT_SECRET, options)
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    } catch (e) {
        return null
    }
}