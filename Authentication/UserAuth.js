import { UserModel } from "../model/UserSchema.js";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv"
dotenv.config()

const UserAuth = async (req, res, next) => {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET_KEY;
 
  
  passport.use(new Strategy(opts, (jwt_playload, done) => {
    
    UserModel.findone({ id: jwt_playload.sub }, function (err , data) {
      if (err) {
        return done(err, false);
    }
    if (data) {
        return done(null, data);
    } else {
        return done(null, false);
    }})
    
  }))
}

export default UserAuth