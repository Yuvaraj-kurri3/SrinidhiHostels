import mongoose from 'mongoose';

const registerSchema= new mongoose.Schema({

    StudentRoomNumber:{
        type:String,
        required:true, 
    },
    StudentName:{
        type:String,
        required:true  
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    Role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }


});

export default mongoose.model('Student',registerSchema);