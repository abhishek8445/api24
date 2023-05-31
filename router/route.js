import express from 'express';
import{ UserRegistraion ,UserLogin  ,TokenAcess ,DeleteUser ,Pagination ,UserProfile , UserAddress}from '../controller/UserController.js';
 import LoginMiddlewere from '../middleware/UserMiddleware.js';



const router = express.Router()

router.post('/register', UserRegistraion)
router.post('/login' , UserLogin)
router.get('/get/:id', TokenAcess)
router.put('/delete/:username', DeleteUser)
router.get('/list/:page', Pagination )
router.post('/login/profile/:token' , LoginMiddlewere , UserProfile )
router.post('/address/:id' ,LoginMiddlewere , UserAddress )




export default router; 