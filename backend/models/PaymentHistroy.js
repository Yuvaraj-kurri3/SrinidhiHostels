import mongoose  from "mongoose";

const paymentHistory= new mongoose.Schema({
    studentid:{
        type:String,
        required:true
    },
    
    paymentdate:{
        type:Date,
        required:true
    }
})