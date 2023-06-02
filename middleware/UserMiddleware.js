import { TokenModel } from "../model/UserSchema.js";
const LoginMiddlewere = async (req, res, next) => {

    const bearerHeader = req.headers['authorization']
    const bearer = bearerHeader.split(" ")
    const token = bearer[1]

    const findToken = await TokenModel.findOne({ access_token: token })
    if (!findToken) {
        throw new Error("token not Found")
    }
    req.user = findToken.user_id
    next()
}

export default LoginMiddlewere