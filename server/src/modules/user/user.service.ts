import { User, userModel } from "./user.model";

export async function creteUser(user: Omit<User, 'comparePassword'>) {
    return userModel.create(user)
}

export async function findUserByEmail(email: User['email']): Promise<User | null> {
    return userModel.findOne({ email })
}
