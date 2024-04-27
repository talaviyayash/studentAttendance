import {createAdmin,LoginAdmin} from '../controller/adminCtrl.js';
import { Router } from 'express';
const  router = Router();
router.route('/register').post(createAdmin)
router.route('/login').post(LoginAdmin)




export default router