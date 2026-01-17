import studentpaymentHistory from '../models/PaymentHistroy.js';

export const studentspaymenthistroy= async(req,res)=> {
    try {
        let response= await studentpaymentHistory.find({});
        return res.status(200).json({message:"histroy fetched sucessfully",responses:response})
    } catch (error) {
        
    }
}