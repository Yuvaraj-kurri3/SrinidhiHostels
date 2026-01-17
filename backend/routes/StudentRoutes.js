import express from 'express';
import * as user from '../controllers/StudentController.js';
import * as  student from '../controllers/AddNewStudents.js';
import * as history from '../controllers/PaymentHistroyController.js';


const router = express.Router();

router.post('/studentregistration', user.RegisterStundet);
router.post('/studentlogin', user.loginstudent);
router.post('/addnewstudent', student.AddNewStudents);
router.get('/allstudents', user.getAllStudents);
router.delete('/deletestudent/:id', user.deletestudent);
router.get('/getstudentbymail/:email', user.getStudentbymail);
router.put('/updatestudent/:id', user.updatestudent);
router.get('/getbyroomnumber/:roomnumber', user.Getbyroomnumber);
router.get('/unpaidlist', user.unpaidlist);
router.put('/updatepaymentstatus/:id', user.UpdatePaymentStatus);
// router.get('/latestpaymentstatus', user.getLatestPaymentStatus);
router.put('/updateallpaymentstatus', student.UpdateAllPaymentStatus);
router.get('/paymenthistroy', history.studentspaymenthistroy);
 
export default router;