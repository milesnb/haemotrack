import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

export default function ClinicianDashboard() {
  const [patients, setPatients] = useState([]);
  const [newPatientUID, setNewPatientUID] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchPatients = async (clinicianUID) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/patients/${clinicianUID}`);
      setPatients(res.data);
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    }
  };

  const assignPatient = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/assign-patient', {
        clinicianUID: auth.currentUser.uid,
        patientUID: newPatientUID
      });
      alert("Patient assigned!");
      fetchPatients(auth.currentUser.uid);
    } catch (err) {
      console.error('Assign failed:', err);
      alert("Failed to assign patient.");
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchPatients(auth.currentUser.uid);
    }
  }, []);

  return (
    <div>
      <h2>My Patients</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {patients.map((p, i) => (
          <li key={i} style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => toggleDropdown(i)}
              style={{ padding: '0.5rem 1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {p.firebaseUID}
            </button>
            {openDropdown === i && (
              <div style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                <p><strong>Email:</strong> {p.email || 'Unknown'}</p>
                <p><strong>Role:</strong> {p.role}</p>
                <p><strong>UID:</strong> {p.firebaseUID}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h3>Add Patient</h3>
      <input
        type="text"
        placeholder="Patient UID"
        value={newPatientUID}
        onChange={(e) => setNewPatientUID(e.target.value)}
      />
      <button onClick={assignPatient}>Assign</button>
    </div>
  );
}