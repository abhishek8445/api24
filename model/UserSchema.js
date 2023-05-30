import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate'

const UserData = mongoose.Schema({
    username: {
        type: String,
        require: true,

    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,

    }
})

const Token = mongoose.Schema({
    user_id: {
        type: String,
    },
    access_token: {
        type: String
    },
    expireAt:  {
        type: Date,
     default: Date.now() + (1000 * 60 *  1 * 1 )
    }
})

UserData.plugin(mongoosePaginate)

const TokenModel = new mongoose.model("accessToken", Token);
const UserModel = new mongoose.model("client", UserData);

export  {UserModel , TokenModel }
