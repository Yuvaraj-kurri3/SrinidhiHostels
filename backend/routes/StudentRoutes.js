import express from 'express';
import * as user from '../controllers/StudentController.js';
import { AddNewStudents } from '../controllers/AddNewStudents.js';


const router = express.Router();

router.post('/studentregistration', user.RegisterStundet);
router.post('/studentlogin', user.loginstudent);
router.post('/addnewstudent', AddNewStudents);
router.get('/allstudents', user.getAllStudents);
router.delete('/deletestudent/:id', user.deletestudent);
router.get('/getstudentbymail/:email', user.getStudentbymail);
router.put('/updatestudent/:id', user.updatestudent);
export default router;