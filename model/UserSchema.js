import mongoose from "mongoose";

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
        lowercase: true,
        min: [2, "minimum 2 character fill"],
        max: [10, 'max 10 character fill']
    }
})

const UserModel = new mongoose.model("client", UserData);
export default UserModel

