 import express from 'express';
import * as user from '../controllers/StudentController.js';


const router=express.Router();

router.post('/studentregistration',user.RegisterStundet);

export default router;