import express from 'express';
import{ UserRegistraion ,UserLogin  ,TokenAcess ,DeleteUser}from '../controller/UserController.js';



const router = express.Router()

router.post('/register', UserRegistraion)
router.post('/login' , UserLogin)
router.get('/get/:id', TokenAcess)
router.put('/delete/:username', DeleteUser)




export default router; 