import { TokenModel } from "../model/UserSchema.js";
const LoginMiddlewere = async (req, res, next) => {
    try {

        const Bearer = req.headers['authorization']
        const GetToken = Bearer.substring(7, Bearer.length)

        const findToken = await TokenModel.findOne({ access_token: GetToken })
        if (!findToken) {
            throw new Error("token not Found")
        }
    }
    catch (err) {
        res.json({ status: false, error: err.keyValue, message: err.message })
    }
    next()
}

export default LoginMiddlewere