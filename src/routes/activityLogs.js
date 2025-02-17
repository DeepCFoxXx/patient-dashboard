import express from "express";
import ActivityLog from "../models/ActivityLog.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const logs = await ActivityLog.find().populate("patientId");
  res.json(logs);
});

router.post("/", async (req, res) => {
  try {
    const newLog = new ActivityLog(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
