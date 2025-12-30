import { getModelForClass, prop, pre } from "@typegoose/typegoose"
import argon2 from "argon2"

@pre<User>("save", async function () {
    if (!this.isModified("password")) return

    this.password = await argon2.hash(this.password)
})
export class User {
    @prop({ required: true, unique: true })
    public username!: string

    @prop({ required: true, unique: true, lowercase: true })
    public email!: string

    @prop({ required: true })
    public password!: string

    public async comparePassword(password: string): Promise<boolean> {
        return argon2.verify(this.password, password)
    }
}

export const userModel = getModelForClass(User, {
    schemaOptions: {
        timestamps: true,
    },
})
