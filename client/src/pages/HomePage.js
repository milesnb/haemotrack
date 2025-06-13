
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="homepage-container">
      
      <section className="hero">
        <h2>Manage Your Treatments with Ease</h2>
        <p>
          HaemoTrack helps you securely track treatments, medications, and
          history in one simple dashboard.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline">
            Already have an account?
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <img
            src="/treatment-plan.png"
            alt="Track Treatments"
          />
          <h3>Track Treatments</h3>
          <p>Log every treatment securely and access your full history anytime.</p>
        </div>
        <div className="feature">
          <img
            src="/pill.png"
            alt="Manage Medications"
          />
          <h3>Manage Medications</h3>
          <p>Store dose info, batch numbers, and expiration dates with ease.</p>
        </div>
        <div className="feature">
          <img
            src="/lock.png"
            alt="Stay Secure"
          />
          <h3>Stay Secure</h3>
          <p>All your data is protected with secure login and storage.</p>
        </div>
      </section>

      <section className="hero about-us">
        <h2>About Us</h2>
        <p>
          HaemoTrack was built to simplify treatment tracking for individuals managing
          chronic health conditions. Our mission is to empower users with clear, secure,
          and user-friendly tools to monitor their health.
        </p>
      </section>

      <footer className="footer">
        <p>© 2025 HeMoTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}
