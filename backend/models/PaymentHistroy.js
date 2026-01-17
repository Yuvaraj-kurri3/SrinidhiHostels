import mongoose  from "mongoose";

const studentpaymentHistory= new mongoose.Schema({
    studentid:{
        type:String,
        required:true
    },
    studentname:{
        type:String,
        required:true
    },
    roomnumber:{
        type:String,
        required:true
    },
    payments:[{
        status:{
            type:String,
            enum:['Unpaid', 'Paid', 'failed'],
            required:true
        },
        date:{
            type:Date,
            required:true
        }
    }]
})

export default mongoose.model("PaymentHistroy",studentpaymentHistory);