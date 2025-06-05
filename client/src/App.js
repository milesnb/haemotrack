import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';

import Register from './pages/Register';
import Login from './pages/Login';
import LogTreatment from './pages/LogTreatment';
import TreatmentHistory from './pages/TreatmentHistory';
import AddMedication from './pages/AddMedication';
import ClinicianDashboard from './pages/ClinicianDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const res = await axios.get(`http://localhost:5000/api/users/firebase/${currentUser.uid}`);
          setRole(res.data.role); 
        } catch (err) {
          console.error("Failed to fetch role:", err);
        }
      } else {
        setRole(null);
      }
    });

  return () => unsubscribe();
}, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert('You have been logged out.');
  };

  
  return (
    <Router>
      <div>
        <nav
            style={{
              transition: 'all 0.3s ease',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '2rem',
              backgroundColor: '#ffffff',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <Link to="/">Home</Link>
            {!user && <Link to="/register">Register</Link>}
            {!user && <Link to="/login">Login</Link>}
            {user && <Link to="/log-treatment">Log Treatment</Link>}
            {user && <Link to="/treatment-history">View History</Link>}
            {user && <Link to="/add-medication">Add Medication</Link>}
            {role === 'clinician' && <Link to="/clinician-dashboard">Clinician</Link>}
          {user && (<button onClick={handleLogout}
            style={{
              backgroundColor: '#d1001c',
              marginTop: '-0.5px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'inline-block',
              maxWidth: 'fit-content',
              Height: 'fit-content',
              justifyContent: 'space-between',
          }}>Logout</button>)}
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to HaemoTrack</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/log-treatment" element={<LogTreatment />} />
          <Route path="/treatment-history" element={<TreatmentHistory />} />
          <Route path="/add-medication" element={<AddMedication />} />
          <Route path="/clinician-dashboard" element={<ClinicianDashboard />} />
        </Routes>

        {user && (
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Logged in as <strong>{user.email}</strong>
          </p>
        )}
      </div>
    </Router>
  );
}

export default App;
