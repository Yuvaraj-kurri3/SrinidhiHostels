import express from 'express';
import registerSchema from '../models/Student.js';
import Allstudents from '../models/Allstudents.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const RegisterStundet = async (req, res) => {
    const { StudentRoomNumber, StudentName, email, Role, password } = req.body;
    try {
        const existingstudent = await registerSchema.findOne({ email: email });
        if (existingstudent) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        const newstudent = new registerSchema({
            StudentRoomNumber,
            StudentName,
            email,
            Role,
            password
        });

        await newstudent.save();
        res.status(201).json({ message: 'Student Registered Successfully', data: newstudent });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
        console.log('Error in student registration:', error);
    }

}

export const loginstudent = async (req, res) => {
    const { email, password } = req.body;
    // console.log('jswtsecret',process.env.srnidhi_jwtSecret);

    try {
        const Registeredstudent = await registerSchema.findOne({ email: email });
        if (!Registeredstudent) {
            return res.status(404).json({ message: 'Student not found! Please register' });
        }
        if (Registeredstudent.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: Registeredstudent.email, Role: Registeredstudent.Role, id: Registeredstudent._id }, process.env.srnidhi_jwtSecret, { expiresIn: '1h' });

        // Store token in session
        req.session.studentToken = token;
        req.session.user = {
            email: Registeredstudent.email,
            Role: Registeredstudent.Role,
            id: Registeredstudent._id,
            name: Registeredstudent.StudentName
        };

        // Save session explicitly
        req.session.save((err) => {
            if (err) {
                console.log('Session save error:', err);
                return res.status(500).json({ message: 'Session save failed' });
            }
            console.log('Session saved successfully:', req.sessionID);
            return res.status(200).json({ message: 'Login Successful', data: Registeredstudent, token: token });
        });
    } catch (error) {
        console.log('Error in student login:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}




export const getAllStudents = async (req, res) => {
    try {
        const students = await Allstudents.find({});
        res.status(200).json({ message: 'Students fetched successfully', data: students });
    }
    catch (error) {
        console.log('Error in fetching students:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

export const getStudentbymail = async (req, res) => {
    const { email } = req.params;
    try {
        const students = await Allstudents.findOne({ Email: email });
        res.status(200).json({ message: 'Student fetched successfully', data: students });
    }
    catch (error) {
        console.log('Error in fetching student:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

export const deletestudent = async (req, res) => {
    const { id } = req.params;
    try {
        await Allstudents.findByIdAndDelete(id);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.log('Error in deleting student:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

export const updatestudent = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedStudent = await Allstudents.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully', data: updatedStudent });
    } catch (error) {
        console.log('Error in updating student:', error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}