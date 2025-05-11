const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  userId: { type: String, required: true },   // Firebase UID
  name: { type: String, required: true },
  dosage: { type: Number, required: true },
  batchNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },
});

module.exports = mongoose.model('Medication', MedicationSchema);