import {createCollege} from '../controller/collegeCtrl.js';
import { Router } from 'express';
const  router = Router();
router.route('/create').post(createCollege)




export default router