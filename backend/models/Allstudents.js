import mongoose from "mongoose";

const allstudents=new mongoose.Schema({
    RoomNumber:{
        type:String,
        required:true,
    },
    Sharing:{
        type:String,
        required:true,
    },
    StartingDate:{
        type:Date,
        required:true,
    },
    AmountPerMonth:{
        type:String,
        required:true,
    },
    StudentName:{
        type:String,
        required:true,
    },
    Mobilenumber:{
        type:String,    
        required:true,
    },
    PMobilenumber:{
        type:String,    
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Address:{
        type:String,
        required:true,
    },
    CollegeName:{
        type:String,
        required:true,
    },
    CourseNameandYear:{
        type:String,
        required:true,
    },
    paymentstatus:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    }
    
})

export default mongoose.model('Allstudents',allstudents);