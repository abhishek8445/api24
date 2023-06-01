import mongoose, { Schema } from "mongoose";
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
  },
  _id: {
    type: mongoose.Types.ObjectId, ref: 'useraddress'
  },
})
UserData.plugin(mongoosePaginate)
const UserModel = new mongoose.model("clients", UserData);
const Token = mongoose.Schema({
  user_id: {
    type: String,
  },
  access_token: {
    type: String
  },
  expireAt: {
    type: Date,
    default: Date.now() + (1000 * 60 * 60)
  }
}, {
  timestamps: true
})

const TokenModel = new mongoose.model("accessToken", Token);

const Address = ({
  user_id: {
    type: mongoose.Types.ObjectId, ref: 'clients'
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pin_code: {
    type: Number
  },
  phone_no: {
    type: Number
  },
})


const AddressModel = new mongoose.model('useraddress', Address)

export { UserModel, TokenModel, AddressModel }
