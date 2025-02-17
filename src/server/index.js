import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import activityLogRoutes from "./routes/activityLogs.js";
import patientRoutes from "./routes/patients.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/patients", patientRoutes);
app.use("/api/activity-logs", activityLogRoutes);

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/patientDB";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
