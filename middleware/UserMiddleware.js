
import { TokenModel } from "../model/UserSchema.js";
const LoginMiddlewere = async (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    const bearer = bearerHeader.split(" ")
    const token = bearer[1]

    const findToken = await TokenModel.findOne({ access_token: token })
    if (!findToken) {
     res.json({status:false , message:"token not found"})
    }
    else{
        req.user = findToken.user_id
        next()
        }
       
  
}   

export default LoginMiddlewere









