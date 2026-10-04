import { FormEvent, useState } from "react";
import axios from "axios";

type LoginProps = {
  onLogin: () => void;
};

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      onLogin();
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">S</div>

          <div>
            <strong>SVIET</strong>
            <span>Student Management System</span>
          </div>
        </div>

        <div className="login-content">
          <span className="login-label">
            STUDENT MANAGEMENT SYSTEM
          </span>

          <h1>
            Everything you need to manage
            <br />
            student performance.
          </h1>

          <p>
            Manage students, attendance, results and academic
            performance from one simple platform.
          </p>

          <div className="login-features">
            <div>
              <b>✓</b>
              Student Management
            </div>

            <div>
              <b>✓</b>
              Attendance Tracking
            </div>

            <div>
              <b>✓</b>
              Academic Results
            </div>
          </div>
        </div>

        <div className="login-footer">
          © 2026 SVIET Student Portal
        </div>
      </div>

      <div className="login-right">
        <form
          className="login-card"
          onSubmit={handleLogin}
        >
          <div className="mobile-logo">S</div>

          <span className="form-label">
            WELCOME BACK
          </span>

          <h2>Sign in to your account</h2>

          <p className="form-subtitle">
            Enter your details to continue to the dashboard.
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <label>Email address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="secure-text">
            🔒 Secure authentication powered by JWT
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;