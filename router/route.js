import express from 'express';
import UserRegistraion from '../controller/UserController.js';
 import validate from '../validator/validate_condition.js';
 import {check} from 'express-validator'

const router = express.Router()

router.post('/register',   [ check('email', 'Email length should be 10 to 30 characters')
.isEmail().isLength({ min: 10, max: 15 }),
check('username', 'Name length should be 10 to 12 characters')
.isLength({ min: 10, max: 12 }),
check('password', 'Password length should be 8 to 10 characters')
.isLength({ min: 8, max: 10 })
]  ,validate, UserRegistraion)



export default router; 