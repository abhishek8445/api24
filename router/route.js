import express from 'express';
import UserRegistraion from '../controller/UserController.js';

const router = express.Router()

router.post('/register', UserRegistraion)


export default router; 