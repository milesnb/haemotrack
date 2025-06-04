import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
   
  const data = [
    { name: 'Mon', treatments: 2 },
    { name: 'Tue', treatments: 5 },
    { name: 'Wed', treatments: 3 },
    { name: 'Thu', treatments: 4 },
    { name: 'Fri', treatments: 1 },
    { name: 'Sat', treatments: 0 },
    { name: 'Sun', treatments: 3 },
  ];

  
  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#fff',
      color: '#b30000',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    sidebar: {
      width: '80px', 
      backgroundColor: '#b30000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    },
    sidebarList: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      width: '100%',
      textAlign: 'center',
    },
    sidebarLink: {
      display: 'block',
      padding: '20px 0',
      fontSize: '24px',
      color: '#fff',
      textDecoration: 'none',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      transition: 'background-color 0.3s',
    },
    sidebarLinkHover: {
      backgroundColor: '#990000',
    },
    mainContent: {
      flex: 1,
      padding: '30px 40px',
      overflowY: 'auto',
    },
    heading: {
      marginBottom: '10px',
      fontWeight: '700',
      fontSize: '28px',
    },
    subtext: {
      marginBottom: '30px',
      fontSize: '16px',
      color: '#660000',
    },
    cards: {
      display: 'flex',
      gap: '20px',
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
    card: {
      flex: '1 1 200px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 3px 10px rgba(179,0,0,0.15)',
      padding: '20px',
      color: '#b30000',
      textDecoration: 'none',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(179,0,0,0.3)',
    },
    cardHeading: {
      marginBottom: '10px',
      fontWeight: '600',
      fontSize: '20px',
    },
    graphSection: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 3px 10px rgba(179,0,0,0.15)',
    },
    graphHeading: {
      marginBottom: '20px',
      fontWeight: '600',
      fontSize: '22px',
      color: '#b30000',
    },
    graphPlaceholder: {
      height: '300px',
    },
  };

  return (
    <div style={styles.container}>

      <aside style={styles.sidebar}>
        <ul style={styles.sidebarList}>
          <li>
            <Link to="/log-treatment" style={styles.sidebarLink} title="Log Treatment">
              🩺
            </Link>
          </li>
          <li>
            <Link to="/treatment-history" style={styles.sidebarLink} title="Treatment History">
              📜
            </Link>
          </li>
          <li>
            <Link to="/add-medication" style={styles.sidebarLink} title="Add Medication">
              💊
            </Link>
          </li>
          
        </ul>
      </aside>

      
      <main style={styles.mainContent}>
        <h1 style={styles.heading}>Welcome Back!</h1>
        <p style={styles.subtext}>Here's your health dashboard overview.</p>

        
        <section style={styles.cards}>
          <Link to="/treatment-history" style={styles.card}>
            <h2 style={styles.cardHeading}>Treatments Logged</h2>
            <p>23</p>
          </Link>
          <Link to="/medications" style={styles.card}>
            <h2 style={styles.cardHeading}>Medications</h2>
            <p>7</p>
          </Link>
          <Link to="/appointments" style={styles.card}>
            <h2 style={styles.cardHeading}>Upcoming Appointments</h2>
            <p>2</p>
          </Link>
        </section>

        
        <section style={styles.graphSection}>
          <h2 style={styles.graphHeading}>Recent Treatment History</h2>
          <div style={styles.graphPlaceholder}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="#b30000" />
                <YAxis stroke="#b30000" />
                <Tooltip />
                <Bar
                  dataKey="treatments"
                  fill="#b30000"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
