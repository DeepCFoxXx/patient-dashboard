import dotenv from 'dotenv';
dotenv.config();


import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import authMiddleware from '../middlewares/authMiddleware.js';
import activityLogRoutes from '../routes/activityLogs.js';
import authRoutes from '../routes/auth.js';
import patientRoutes from '../routes/patients.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/patients', authMiddleware, patientRoutes);
app.use('/api/activity-logs', authMiddleware, activityLogRoutes);

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/patientDB";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
