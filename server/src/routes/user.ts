/* Routes file of user endpoints */

import { Router } from 'express';
import { body } from 'express-validator';

import {getUser, updateProfile} from "../controllers/user"
import isAuth from '../middlewares/is-auth';

const router = Router();

router.get('/',isAuth,getUser);

router.patch('/update',[
    body('name').custom((value, { req }) => {
        if (value && value.length < 3) {
            return Promise.reject('Name must have atleast 3 characters long');
        }
        return true;
    }),
    body('age').custom((value, { req }) => {
        /* Check age is a number or not */
        if (value && Number.isNaN(value) ) {
            return Promise.reject('Age must be a number');
        }
        return true;
    }),
    body('gender').custom((value, { req }) => {
        /* Check gender is from specified values or not */
        const genderArray = ['male','female','other'];
        if (value &&  !genderArray.includes((value as string).toLowerCase())) {
            return Promise.reject('Not a valid gender');
        }
    
        return true;
    }),
],isAuth,updateProfile)

export default router;