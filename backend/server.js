import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dbconfig/db.js';
import userRoutes from './routes/StudentRoutes.js';
import cors from 'cors';
import session from 'express-session';

// Load environment variables first
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://srinidhihostels.netlify.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman, curl
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

// Session middleware
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,          // ✅ HTTPS only
      httpOnly: true,        // ✅ JS cannot access cookie
      sameSite: "none",      // ✅ required for cross-site
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

const port = process.env.SRINIDHI_PORT || 5000;
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/students', userRoutes);
app.get('/', (req, res) => {
  res.send('Srinidhi Hostels Backend is running');
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
})