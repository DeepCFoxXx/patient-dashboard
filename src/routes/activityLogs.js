import express from "express";
import ActivityLog from "../models/activityLog.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find();
    return res.json(activityLogs);
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    return res.status(500).json({ message: "Failed to fetch activity logs" });
  }
});

export default router;
