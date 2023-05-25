import UserModel from "../model/UserSchema.js";
import bcrypt from 'bcrypt'

export async function createUser(data) {

    const saltRound = 10;
    const { username, password, confirmPassword, email, firstname, lastname } = data

    const UserFind = await UserModel.findOne({ email: email })
    if (UserFind) {
        throw new Error(`email already exists`);
    }
    if (password !== confirmPassword) {
        throw new Error("password not matched")
    }
    const hashPwd = await bcrypt.hash(password, saltRound)
    const AlloverData = {
        username: username,
        password: hashPwd,
        email: email,
        firstname: firstname,
        lastname: lastname
    }
    const findUser = await UserModel.findOne({ name: username })
    if (findUser) {
        throw new Error(`User Already Exist`)
    };

    const body = new UserModel(AlloverData);
    return await body.save();
}




