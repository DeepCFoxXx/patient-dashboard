import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
  activityLogId: { type: String, required: true, unique: true },
  patientId: { type: String, required: true, ref: "Patient" },
  sessionId: { type: String, required: true },
  activityType: { type: String, required: true, enum: ["ASSIST_MODE", "OTHER"] },
  timestamp: { type: Date, required: true },
  durationInSeconds: { type: Number, required: true },
  completedRepCount: { type: Number, required: true },
  rpeScore: { type: Number, required: true, min: 1, max: 10 },
});

export default mongoose.model("ActivityLog", activityLogSchema);
