import { Router } from 'express';
import { body } from "express-validator";

import { postLogin, postSignup } from '../controllers/auth';
import User from '../models/user';

const router = Router();

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
],postLogin);


router.post('/signup',[
    body('email').isEmail().withMessage('Invalid Email').custom(async (value,{req})=>{
        const user = await User.findByEmail(value);
        if (user) {
            return Promise.reject("E-mail already exists!");
        }
    }).normalizeEmail(),

    body('password').not().isEmpty().withMessage('Password is empty').isLength({min:6}).withMessage('Password must have atleast 6 character long'),
    body('confirm_password').custom((value,{req})=>{
        
        if(value !== req.body.password){
            return Promise.reject('Passwords must be same');
        }
        return true;
    }),
    body('name').not().isEmpty().withMessage('Must have a name').isLength({min:3}).withMessage('Name must have atleast 3 character long')
],postSignup);

export default router;