import express from 'express';
import registerSchema from '../models/Student.js';


 
export const RegisterStundet= async (req,res)=>{
    const {StudentRoomNumber,StudentName,email,Role,password}=req.body;
    try {
        const existingstudent= await registerSchema.findOne({email:email});
        if(existingstudent){
            return res.status(400).json({message:'Student already exists'});
        }

        const newstudent=new registerSchema({
            StudentRoomNumber,
            StudentName,
            email,
            Role,
            password
        });

        await newstudent.save();
        res.status(201).json({message:'Student Registered Successfully',data:newstudent});
    } catch (error) {
        return res.status(500).json({message:'Something went wrong',error:error.message});
    }

 }
 