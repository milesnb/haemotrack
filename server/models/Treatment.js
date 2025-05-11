const mongoose = require('mongoose');

const TreatmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },              // Firebase UID
  date: { type: Date, default: Date.now },               // Timestamp of event
  dosage: { type: Number, required: true },              // IU or mg
  batchNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  location: { type: String },                            
  symptoms: { type: String },                            // symptom note
  eventType: { type: String, default: 'bleeding' },      // e.g., "bleeding"
  used: { type: Boolean, default: true }                 // whether treatment was administered
});

module.exports = mongoose.model('Treatment', TreatmentSchema);
