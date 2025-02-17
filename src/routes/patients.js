import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

export default router;
