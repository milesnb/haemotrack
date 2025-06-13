
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
import HomePage from './pages/HomePage';
import LoggedIn from './pages/LoggedIn'; // Use this as logged-in home
import Appointments from './pages/Appointments';
import Medications from './pages/Medications';

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
        <a href='/'><img src={`${process.env.PUBLIC_URL}/haemooo.png`} alt="Logo" className="nav_Logo" /></a>
        <nav>
          {!user && <Link to="/">Home</Link>}
          {!user && <Link to="/register">Register</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && <Link to="/">Home</Link>}
          {user && <Link to="/log-treatment">Log Treatment</Link>}
          {user && <Link to="/treatment-history">View History</Link>}
          {user && <Link to="/add-medication">Add Medication</Link>}
          {role === 'clinician' && <Link to="/clinician-dashboard">Clinician</Link>}
          {user && (
            <button1 onClick={handleLogout} className="nav a">
              Logout
            </button1>
          )}
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/log-treatment" element={<LogTreatment />} />
          <Route path="/treatment-history" element={<TreatmentHistory />} />
          <Route path="/add-medication" element={<AddMedication />} />
          <Route path="/clinician-dashboard" element={<ClinicianDashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medications" element={<Medications />} />

          {/* Single route for home page */}
          <Route path="/" element={user ? <LoggedIn /> : <HomePage />} />
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
