import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dbconfig/db.js';
import userRoutes from './routes/StudentRoutes.js';
import cors from 'cors';
const app=express();

app.use(cors());
const port= process.env.SRINIDHI_PORT || 3000;
connectDB();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/api/students',userRoutes);
app.get('/',(req,res)=>{
    res.send('Srinidhi Hostels Backend is running');
})

app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})