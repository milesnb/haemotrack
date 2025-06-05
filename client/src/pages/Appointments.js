
import { useEffect, useState } from 'react';


export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    
    setAppointments([
      { date: '2025-06-12', time: '10:00 AM', location: 'St. Mary’s Hospital' },
      { date: '2025-07-04', time: '2:00 PM', location: 'City Clinic' },
    ]);
  }, []);

  return (
    <div className="page-container">
      <h1>Upcoming Appointments</h1>
      <div className="card-list">
        {appointments.map((app, i) => (
          <div className="appointment-card" key={i}>
            <h2>{app.date}</h2>
            <p><strong>Time:</strong> {app.time}</p>
            <p><strong>Location:</strong> {app.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}