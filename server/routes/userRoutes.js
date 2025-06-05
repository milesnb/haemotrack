const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users/register
router.post('/register', async (req, res) => {
  const { firebaseUID, email, role } = req.body;

  try {
    let existing = await User.findOne({ firebaseUID });
    if (existing) return res.status(200).json(existing);

    const newUser = new User({ firebaseUID, email, role });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'User registration failed' });
  }
});

router.get('/firebase/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/assign-patient', async (req, res) => {
  const { patientUID, clinicianUID } = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      { firebaseUID: patientUID, role: 'patient' },
      { clinicianId: clinicianUID },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Patient not found.' });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error assigning patient' });
  }
});

router.get('/patients/:clinicianUID', async (req, res) => {
  try {
    const patients = await User.find({ clinicianId: req.params.clinicianUID });
    res.status(200).json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch patients.' });
  }
});

module.exports = router;