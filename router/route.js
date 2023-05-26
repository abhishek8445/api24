import express from 'express';
import{ UserRegistraion ,UserLogin }from '../controller/UserController.js';



const router = express.Router()

router.post('/register', UserRegistraion)

router.post('/login' , UserLogin)


export default router; 