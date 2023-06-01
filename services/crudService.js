import { UserModel, TokenModel, AddressModel } from "../model/UserSchema.js";
import bcrypt from 'bcrypt'
import md5 from "md5";

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
    const CheckUser = await UserModel.findOne({ username });
    if (!CheckUser)
        throw Error(`user not found`)
    const CheckPwd = await bcrypt.compare(password, CheckUser.password)
    if (!CheckPwd)
        throw Error('password not matched')
    const CreateToken = { username: CheckUser.username, _id: CheckUser._id }
    const data = {
        access_token: md5(CreateToken),
        user_id: CreateToken._id
    }
    const Collection2 = TokenModel(data)
    Collection2.save();
    return data
}

const getUser = async (user_id) => {
    const UserID = await AddressModel.findOne({user_id}).populate('clients').exec();
    console.log(UserID);
    if (UserID) {
        return UserID
    }
    else throw new Error("User not found")
}

const DelteUserDetails = async (GetUserName) => {
    try {
        const GetUserByParams = await UserModel.deleteOne({ username: GetUserName })
        if (GetUserByParams.deletedCount == 0) {
            throw new Error('USERNAME FALSE=====>')
        }
    }
    catch (err) {
        throw new Error(`User not Deleted =====> ${err}`)
    }
}
const UserGetPagination = async (offset, limit) => {
    try {
        return await UserModel.paginate({}, { offset, limit }, function (err, result) {
            if (err) {
                throw new Error('pagination Error Page 1 ')
            }
            return result
        })
    }
    catch (err) {
        throw new Error(err)
    }
}
const UserDetails = async (BodyData) => {
    try {
        const { address, city, state, pin_code, phone_no, user_id } = BodyData
        const AddressAllOverData = {
            address: address,
            city: city,
            state: state,
            pin_code: pin_code,
            phone_no: phone_no,
            user_id
        }
        const SaveData = await AddressModel(AddressAllOverData)
        SaveData.save()
    
    }
    catch (err) {
        throw new Error(err);
    }
}

export { createUser, LoginService, getUser, DelteUserDetails, UserGetPagination, UserDetails }




