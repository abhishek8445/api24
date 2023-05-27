import UserModel from "../model/UserSchema.js";
import bcrypt from 'bcrypt'

const createUser = async (data) => {
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
    const findUser = await UserModel.findOne({ username: username })
    if (findUser) {
        throw new Error(`User Already Exist`)
    };
    const body = new UserModel(AlloverData);
    return await body.save();
}


const LoginService = async (requestData) => {
    const { username, password } = requestData
    try {
        const CheckUser = await UserModel.findOne({ username: username });
        if (!CheckUser) throw Error(`Username not matched ${err}`)
        const CheckPwd = await bcrypt.compare(password, UserModel.findOne({ password: password }))
        if (!CheckPwd) throw Error('password not matched')
        return CheckUser.id
    }
    catch (err) {
        throw new Error(`User not Found ${err}`)
    }
}


const GetToken = async (GetTokenByParams) => {
    try {
        const paramsID = await GetTokenByParams
        const UserID = await UserModel.find({ _id: paramsID })
        if (UserID) {
            return UserID
        }
    }
    catch (err) {
        throw new Error(`Access token is not matched ${err}`)
    }
}

const DelteUserDetails = async (GetUserName) => {
    try {
        const GetUserByParams = await UserModel.findOne({ username: GetUserName })
        if (GetUserByParams) {    
             await GetUserByParams.deleteOne()
        }
    }
    catch (err) {
        throw new Error (`User not Deleted =====> ${err}`)
    }
}

export { createUser, LoginService, GetToken, DelteUserDetails }




