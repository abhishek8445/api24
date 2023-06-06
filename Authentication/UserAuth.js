import { UserModel } from "../model/UserSchema.js";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from "dotenv"
dotenv.config()

const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET_KEY;
const passportConfig =  new JwtStrategy(opts, async (jwt_payload, done) => {
  
try{
  const user = await UserModel.findOne({_id:jwt_payload.CheckUser._id})
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
    catch(err){
      return err
    }
})

export default passportConfig;


