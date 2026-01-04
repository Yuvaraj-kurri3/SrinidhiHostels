import mongoose from "mongoose";
import dotenv from "dotenv";
import allstudents from "../models/Allstudents.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') });
const resetPaymentStatus = async () => {
    console.log("DB string:", process.env.MONGO_URI);
  try {
    console.log("🔄 Monthly payment reset started...");

    await mongoose.connect(process.env.MONGO_URI);

    const result = await allstudents.updateMany(
      { isActive: true, paymentstatus: "Paid" },
      { $set: { paymentstatus: "Unpaid" } }
    );

    console.log(`✅ Updated ${result.modifiedCount} students to Unpaid`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Cron job failed:", error);
    process.exit(1);
  }
};

resetPaymentStatus();
