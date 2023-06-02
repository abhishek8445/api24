import express from 'express';
import { DeleteUser, Pagination, getUserData, UserAddress, UserLogin,  UserRegistraion } from '../controller/UserController.js';
import LoginMiddlewere from '../middleware/UserMiddleware.js';



const router = express.Router()

router.post('/register', UserRegistraion)
router.post('/login', UserLogin)
router.get('/get', LoginMiddlewere, getUserData)
router.put('/delete/:username', DeleteUser)
router.get('/list/:page', Pagination)
router.post('/address/', LoginMiddlewere, UserAddress)





export default router; 