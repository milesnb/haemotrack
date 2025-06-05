
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const LoggedIn = () => {
  const data = [
    { name: 'Mon', treatments: 2 },
    { name: 'Tue', treatments: 5 },
    { name: 'Wed', treatments: 3 },
    { name: 'Thu', treatments: 4 },
    { name: 'Fri', treatments: 1 },
    { name: 'Sat', treatments: 0 },
    { name: 'Sun', treatments: 3 },
  ];

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <ul className="dashboard-sidebar-list">
          <li><Link to="/log-treatment" title="Log Treatment">🩺</Link></li>
          <li><Link to="/treatment-history" title="Treatment History">📜</Link></li>
          <li><Link to="/add-medication" title="Add Medication">💊</Link></li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h1>Welcome Back!</h1>
        <p className="dashboard-subtext">Here's your health dashboard overview.</p>

        <section className="dashboard-cards">
          <Link to="/treatment-history" className="dashboard-card">
            <h2>Treatments Logged</h2>
            <p>23</p>
          </Link>
          <Link to="/medications" className="dashboard-card">
            <h2>Medications</h2>
            <p>7</p>
          </Link>
          <Link to="/appointments" className="dashboard-card">
            <h2>Upcoming Appointments</h2>
            <p>2</p>
          </Link>
        </section>

        <section className="dashboard-graph">
          <h2>Recent Treatment History</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#b30000" />
              <YAxis stroke="#b30000" />
              <Tooltip />
              <Bar dataKey="treatments" fill="#b30000" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
};

export default LoggedIn;
