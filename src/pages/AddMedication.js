import { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

export default function AddMedication() {
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    batchNumber: '',
    expiryDate: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("You must be logged in");

    try {
      await axios.post('http://localhost:5000/api/medications/add', {
        ...form,
        userId: user.uid
      });
      alert('Medication added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save medication');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Current Medication</h2>

      <label>
        Medication Name:
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Dosage (IU):
        <input type="number" name="dosage" value={form.dosage} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Batch Number:
        <input type="text" name="batchNumber" value={form.batchNumber} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Expiration Date:
        <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} required />
      </label>
      <br />

      <button type="submit">Save Medication</button>
    </form>
  );
}