import express from 'express';
import { DeleteUser, Pagination, getUserData, UserAddress, UserLogin, UserRegistraion, UserAddressDelete, ForgotPwd, VerifyPwd, UploadProfile, UploadOnline ,SendUserMail ,VerifyMail} from '../controller/UserController.js';
import passportConfig from '../Authentication/UserAuth.js';
import { LoginMiddlewere, PwdMiddleware } from '../middleware/UserMiddleware.js'
import passport from 'passport';
import multer from 'multer';
import UseCloudinary from '../middleware/cloudinary.js';
import cloudinary from 'cloudinary'
import upload from "../middleware/multer.js"
const router = express.Router()

passport.use(passportConfig)

router.post('/register', UserRegistraion);
router.post('/login', UserLogin);
router.get('/get', LoginMiddlewere, getUserData);
router.put('/delete/:username', DeleteUser);
router.get('/list/:page', Pagination);
router.post('/address/', passport.authenticate('jwt', { session: false }), UserAddress);
router.delete('/deleteaddress/:id', passport.authenticate('jwt', { session: false }), UserAddressDelete);
router.post('/forgot-password', ForgotPwd);
router.put('/verify-reset-password/:pwdtoken', PwdMiddleware, VerifyPwd);
router.put('/profile-image', upload.single('profile_img'), UploadProfile);
router.post("/upload", upload.single("file"), UploadOnline)
router.post ("/usenodemailer" , SendUserMail)
router.get("/:id/verify/:token" , VerifyMail)


export default router;  