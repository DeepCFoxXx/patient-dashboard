import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

router.post("/", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
