import allstudents from "../models/Allstudents.js";

export const AddNewStudents=async(req,res)=>{   

    const{RoomNumber,Sharing,StartingDate,AmountPerMonth,StudentName,Mobilenumber,PMobilenumber,Email,Address,CollegeName,CourseNameandYear}=req.body;
     try {
        const isalreadyindb= await allstudents.findOne({Email:Email});
        if(isalreadyindb){
            return res.status(400).json({message:'Student already exists'});
        }
        const newstudent=new allstudents({
            RoomNumber,
            Sharing,
            StartingDate:new Date(StartingDate),
            AmountPerMonth,
            StudentName,
            Mobilenumber,
            Email,
            Address,
            CollegeName,
            CourseNameandYear,
            PMobilenumber
        });

        await newstudent.save();
        res.status(201).json({message:'New Student Added Successfully',data:newstudent});
    } catch (error) {
        console.log('Error in adding new student:',error);
        return res.status(500).json({message:'Something went wrong',error:error.message});
    }
    
}