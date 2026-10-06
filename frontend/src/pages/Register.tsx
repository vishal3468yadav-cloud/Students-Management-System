import { FormEvent, useState } from "react";
import axios from "axios";

type RegisterProps = {
  onRegister: () => void;
};

function Register({ onRegister }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/register",
        {
          name,
          email,
          password,
          role: "student",
        }
      );

      setMessage("Account created successfully. You can login now.");

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        onRegister();
      }, 1000);

    } catch (error: any) {
      console.error("Register error:", error);

      if (error.response?.status === 409) {
        setError("This email is already registered.");
      } else {
        setError("Unable to create account. Please try again.");
      }

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
            Create your student
            <br />
            account.
          </h1>

          <p>
            Create your account to manage students, attendance,
            results and academic performance.
          </p>

          <div className="login-features">
            <div>
              <b>✓</b> Secure Registration
            </div>

            <div>
              <b>✓</b> Student Management
            </div>

            <div>
              <b>✓</b> Secure JWT Login
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
          onSubmit={handleRegister}
        >

          <div className="mobile-logo">
            S
          </div>

          <span className="form-label">
            GET STARTED
          </span>

          <h2>
            Create your account
          </h2>

          <p className="form-subtitle">
            Enter your details to create a new account.
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          <label>
            Full name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />

          <label>
            Email address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
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
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>

          <div className="secure-text">
            🔒 Secure authentication powered by JWT
          </div>

        </form>

      </div>

    </div>
  );
}

export default Register;