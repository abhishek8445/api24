import { UserModel, TokenModel, AddressModel, Pwdmodel } from "../model/UserSchema.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import cloudinary from 'cloudinary'
import UseCloudinary from "../middleware/cloudinary.js"
import upload from "../middleware/multer.js"

import multer from "multer"



// const upload  = multer({
//     dest:'image' ,
//     limits:50000,
//     preservePath:true,
//     filename: 'my-img',
    
// }) 



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
    try {
        const { username, password } = requestData
        const CheckUser = await UserModel.findOne({ username });
        if (!CheckUser) {
            throw new Error(`user not found`)
        }
        const CheckPwd = await bcrypt.compare(password, CheckUser.password)
        if (!CheckPwd) {
            throw new Error('password not matched')
        }
        const jwt_token = jwt.sign({ CheckUser }, process.env.SECRET_KEY, { expiresIn: '120s' })
        const Save_token = {
            access_token: jwt_token,
            user_id: CheckUser._id
        }
        const Collection2 = await TokenModel(Save_token);
        Collection2.save();
        return Save_token
    }
    catch (err) {

        throw Error(`USER LOGIN FAILED ====> ${err}`)
    }
}

const getUser = async (user_id) => {
    const UserID = await AddressModel.findOne({ user_id }).populate('user_id').exec();

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
            address,
            city,
            state,
            pin_code,
            phone_no,
            user_id
        }
        const SaveData = await AddressModel(AddressAllOverData)
        SaveData.save()
    }
    catch (err) {
        throw new Error(err);
    }
}

const AddressDelete = async (BodyData) => {
    try {
        const FindData = await AddressModel.deleteMany({ user_id: BodyData.user_ids })
        console.log(BodyData);
        if (FindData.deletedCount == 0) {
            throw new Error('USERID INVALID FALSE=====>')
        }
    }
    catch (err) {
        throw new Error(`Address Data  not deleted ${err}`)
    }
}

const UserForgotPwd = async (GetEmailByBody) => {
    try {
        const VerifyEmail = await UserModel.findOne({ email: GetEmailByBody })
        if (!VerifyEmail) {
            throw Error('Email-Id is Invalid')
        }
        const Pwd_Token = jwt.sign({ VerifyEmail }, process.env.SECRET_KEY, { expiresIn: "20s" })
        const SavePwdTowken = {
            user_id: VerifyEmail._id,
            pwd_token: Pwd_Token
        }
        const PwdCollection = await Pwdmodel(SavePwdTowken)
        PwdCollection.save()
        return SavePwdTowken
    }
    catch (err) {
        throw new Error(`${err}===========>`)
    }
}

const ResetPwd = async (SendPwd) => {
    try {

        const { password, confirm_password , SendToken } = SendPwd
        if (password !== confirm_password) {
            throw Error('Password Not Matched')
        }
        else {
            const saltRound = 10;
            const BycrptPwd = await  bcrypt.hash(password ,saltRound )
            const UpdatePwd = await UserModel.updateOne({ email: "varsha@gmail.com" }, { password : BycrptPwd })
            const DeleteToken  =await Pwdmodel.deleteOne({pwd_token:SendToken})
        }
    }
    catch (err) {
        throw new Error(err)
    }
}

const UploadCloudinary =  (FilePath) =>{
    cloudinary.v2.uploader.upload(FilePath,(error, result)=>{
        console.log(result, error);
});
}

export { createUser, LoginService, getUser, DelteUserDetails,UploadCloudinary, UserGetPagination, UserDetails, AddressDelete, UserForgotPwd, ResetPwd }


