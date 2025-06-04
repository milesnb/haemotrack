import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

export default function LogTreatment() {
  const [form, setForm] = useState({
    dateOfTreatment: '',
    dosage: '',
    batchNumber: '',
    expiryDate: '',
    symptoms: '',
    eventType: 'bleeding',
  });

  useEffect(() => {
    const fetchMedication = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/medications/${user.uid}`);
        if (res.data) {
          setForm(prev => ({
            ...prev,
            dosage: res.data.dosage,
            batchNumber: res.data.batchNumber,
            expiryDate: res.data.expiryDate.split('T')[0] // Format for input[type=date]
          }));
        }
      } catch (err) {
        console.error('No current medication found or error:', err);
      }
    };

    fetchMedication();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return alert("You must be logged in");

    try {
      await axios.post('http://localhost:5000/api/treatments/log', {
        userId: user.uid,
        date: form.dateOfTreatment, // mapped correctly
        dosage: form.dosage,
        batchNumber: form.batchNumber,
        expiryDate: form.expiryDate,
        symptoms: form.symptoms,
        eventType: form.eventType
      });
      alert("Treatment logged successfully!");
    } catch (error) {
      console.error(error);
      alert("Error logging treatment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log Treatment</h2>

      <label>
        Date of Treatment:
        <input
          type="date"
          name="dateOfTreatment"
          value={form.dateOfTreatment}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Dosage (IU):
        <input
          type="number"
          name="dosage"
          value={form.dosage}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Batch Number:
        <input
          type="text"
          name="batchNumber"
          value={form.batchNumber}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Expiration Date:
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Symptoms:
        <input
          type="text"
          name="symptoms"
          placeholder="e.g. joint pain, bruising"
          value={form.symptoms}
          onChange={handleChange}
        />
      </label>

      <label>
        Event Type:
        <select name="eventType" value={form.eventType} onChange={handleChange}>
          <option value="bleeding">Bleeding</option>
          <option value="prophylaxis">Prophylaxis</option>
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
