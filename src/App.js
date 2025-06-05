import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import Register from './pages/Register';
import Login from './pages/Login';
import LogTreatment from './pages/LogTreatment';
import TreatmentHistory from './pages/TreatmentHistory';
import AddMedication from './pages/AddMedication';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Medications from './pages/Medications';
import Appointments from './pages/Appointments';
import ClinicianDashboard from './pages/ClinicianDashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
          {user && (
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#1a73e8',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '0.4rem 0.75rem',
                borderRadius: '4px',
                transition: 'background 0.2s',
              }}
            >
              Logout
            </button>
          )}
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/log-treatment" element={<LogTreatment />} />
          <Route path="/treatment-history" element={<TreatmentHistory />} />
          <Route path="/add-medication" element={<AddMedication />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/clinician" element={<ClinicianDashboard />} />
          
          

          
          <Route path="/" element={user ? <Dashboard /> : <HomePage />} />
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
