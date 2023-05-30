import express from 'express';
import{ UserRegistraion ,UserLogin  ,TokenAcess ,DeleteUser ,Pagination}from '../controller/UserController.js';



const router = express.Router()

router.post('/register', UserRegistraion)
router.post('/login' , UserLogin)
router.get('/get/:id', TokenAcess)
router.put('/delete/:username', DeleteUser)
router.get('/list/:page', Pagination )




export default router; 