const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');

// POST /api/medications/add
router.post('/add', async (req, res) => {
  const { userId, name, dosage, batchNumber, expiryDate } = req.body;

  try {
    const existing = await Medication.findOne({ userId });
    if (existing) await Medication.deleteOne({ userId }); // Only one active med per user

    const newMed = new Medication({ userId, name, dosage, batchNumber, expiryDate });
    const saved = await newMed.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving medication' });
  }
});

// GET /api/medications/:userId
router.get('/:userId', async (req, res) => {
  try {
    const med = await Medication.findOne({ userId: req.params.userId });
    res.status(200).json(med);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching medication' });
  }
});

module.exports = router;