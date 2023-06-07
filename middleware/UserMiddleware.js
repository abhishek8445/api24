
import { TokenModel , Pwdmodel } from "../model/UserSchema.js";
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

const  PwdMiddleware = async(req , res , next)=>{
     const ParamToken = req.params.pwdtoken
    const VerifyToken = await Pwdmodel.findOne({pwd_token: ParamToken})
    if(!VerifyToken){
        res.json({status:false , message:"Password Token Expired" })
    }
   else{
    req.token = await  Pwdmodel.findOne({pwd_token:ParamToken})
    next()
   }
}

export  {  LoginMiddlewere , PwdMiddleware}









