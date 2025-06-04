import { useEffect, useState } from 'react';


export default function Medications() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    
    setMedications([
      { name: 'Factor VIII', dosage: '500 IU', frequency: 'Twice a week' },
      { name: 'Desmopressin', dosage: '0.3 mcg/kg', frequency: 'As needed' },
    ]);
  }, []);

  return (
    <div className="page-container">
      <h1>Medications</h1>
      <div className="card-list">
        {medications.map((med, i) => (
          <div className="med-card" key={i}>
            <h2>{med.name}</h2>
            <p><strong>Dosage:</strong> {med.dosage}</p>
            <p><strong>Frequency:</strong> {med.frequency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
