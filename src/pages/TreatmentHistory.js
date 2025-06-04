import { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

export default function TreatmentHistory() {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/treatments/user/${user.uid}`);
        setTreatments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Treatment History</h2>
      {treatments.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No treatments logged yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {treatments.map((t, idx) => (
            <li
              key={idx}
              style={{
                background: '#fff',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              }}
            >
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Date:</strong> {new Date(t.date).toLocaleDateString()}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Dosage:</strong> {t.dosage} IU
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Event Type:</strong> {t.eventType}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Batch:</strong> {t.batchNumber}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Expiration:</strong> {new Date(t.expiryDate).toLocaleDateString()}
              </p>
              {t.symptoms && (
                <p style={{ fontStyle: 'italic', color: '#555' }}>
                  <strong>Symptoms:</strong> {t.symptoms}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}