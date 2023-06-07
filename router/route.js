import express from 'express';
import { DeleteUser, Pagination, getUserData, UserAddress, UserLogin,  UserRegistraion ,UserAddressDelete, ForgotPwd ,VerifyPwd ,UploadProfile} from '../controller/UserController.js'; 
 import passportConfig from '../Authentication/UserAuth.js';
import {LoginMiddlewere ,PwdMiddleware} from '../middleware/UserMiddleware.js'
import passport from 'passport';
import multer from 'multer';
const upload  = multer({dest:'image'}) 


passport.use(passportConfig)
const router = express.Router()

router.post('/register', UserRegistraion);
router.post('/login',  UserLogin);
router.get('/get' , LoginMiddlewere ,  getUserData);
router.put('/delete/:username', DeleteUser);
router.get('/list/:page', Pagination);
router.post('/address/', passport.authenticate('jwt', { session: false }), UserAddress);
router.delete('/deleteaddress/:id' ,passport.authenticate('jwt', { session: false }) ,  UserAddressDelete);
router.post('/forgot-password' , ForgotPwd);
router.put('/verify-reset-password/:pwdtoken' , PwdMiddleware ,VerifyPwd);
router.put('/profile-image', upload.single('profile_img') ,UploadProfile)

export default router; 