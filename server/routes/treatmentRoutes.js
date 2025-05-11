const express = require('express');
const router = express.Router();
const Treatment = require('../models/Treatment');

// POST /api/treatments/log
router.post('/log', async (req, res) => {
  try {
    const { userId, dosage, batchNumber, expiryDate, symptoms, eventType } = req.body;

    const newTreatment = new Treatment({
      userId,
      dosage,
      batchNumber,
      expiryDate,
      symptoms,
      eventType,
    });

    const saved = await newTreatment.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/user/:userId', async (req, res) => {
    try {
      const treatments = await Treatment.find({ userId: req.params.userId }).sort({ date: -1 });
      res.status(200).json(treatments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch treatments." });
    }
});

module.exports = router;