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
  
      
    }
})

const UserModel = new mongoose.model("client", UserData);
export default UserModel

