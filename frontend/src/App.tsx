import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Students from "./Students";
import Attendance from "./Attendance";
import Results from "./Results";
import Analytics from "./Analytics";
import Chatbot from "./Chatbot";

import "./index.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("access_token"))
  );

  const [showRegister, setShowRegister] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const menu = [
    "Dashboard",
    "Students",
    "Attendance",
    "Results",
    "Analytics",
    "Chatbot",
  ];

  const logout = () => {
    localStorage.removeItem("access_token");
    setLoggedIn(false);
    setActive("Dashboard");
  };

  if (!loggedIn) {
    if (showRegister) {
      return (
        <Register
          onRegister={() => setShowRegister(false)}
        />
      );
    }

    return (
      <div>
        <Login
          onLogin={() => setLoggedIn(true)}
        />

        <button
          type="button"
          onClick={() => setShowRegister(true)}
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Create Account
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">S</div>

          <div>
            <h2>SVIET</h2>
            <span>Student Portal</span>
          </div>
        </div>

        <div className="menu-title">MAIN MENU</div>

        <nav>
          {menu.map((item) => (
            <button
              type="button"
              key={item}
              className={
                active === item
                  ? "menu-item active"
                  : "menu-item"
              }
              onClick={() => setActive(item)}
            >
              <span className="menu-icon">
                {item === "Dashboard" && "⌂"}
                {item === "Students" && "♙"}
                {item === "Attendance" && "✓"}
                {item === "Results" && "▥"}
                {item === "Analytics" && "◫"}
                {item === "Chatbot" && "✦"}
              </span>

              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            className="menu-item"
            onClick={() => alert("Settings coming soon")}
          >
            ⚙ Settings
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={logout}
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="welcome">
              Good morning, Vishal 👋
            </p>

            <h1>{active}</h1>
          </div>

          <div className="top-actions">
            <button
              type="button"
              className="notification"
            >
              ♢
            </button>

            <div className="profile">
              <div className="avatar">V</div>

              <div>
                <strong>Vishal Yadav</strong>
                <span>Student</span>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD */}

        {active === "Dashboard" && (
          <>
            <section className="hero">
              <div>
                <span className="hero-label">
                  STUDENT MANAGEMENT SYSTEM
                </span>

                <h2>
                  Manage your academic journey smarter.
                </h2>

                <p>
                  Track students, attendance, results and
                  academic performance from one professional
                  dashboard.
                </p>
              </div>

              <div className="hero-mark">SVIET</div>
            </section>

            <section className="stats">
              <div className="stat-card">
                <div className="stat-top">
                  <span>Total Students</span>
                  <b>♙</b>
                </div>

                <h2>1,248</h2>

                <p className="positive">
                  ↑ 12.5% this month
                </p>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Attendance</span>
                  <b>✓</b>
                </div>

                <h2>87.4%</h2>

                <p className="positive">
                  ↑ 4.2% this month
                </p>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Average Score</span>
                  <b>★</b>
                </div>

                <h2>8.6</h2>

                <p className="positive">
                  ↑ 0.8 points
                </p>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Departments</span>
                  <b>▦</b>
                </div>

                <h2>12</h2>

                <p className="neutral">
                  Academic year 2026
                </p>
              </div>
            </section>

            <section className="content-grid">
              <div className="panel performance">
                <div className="panel-header">
                  <div>
                    <h3>Attendance Overview</h3>

                    <p>
                      Monthly attendance performance
                    </p>
                  </div>

                  <select>
                    <option>2026</option>
                    <option>2025</option>
                  </select>
                </div>

                <div className="chart">
                  {[
                    68, 76, 72, 84,
                    79, 88, 87, 92,
                    86, 90, 94, 88,
                  ].map((height, index) => (
                    <div
                      className="bar-group"
                      key={index}
                    >
                      <div
                        className="bar"
                        style={{
                          height: `${height}%`,
                        }}
                      />

                      <span>
                        {
                          [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ][index]
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel activity">
                <div className="panel-header">
                  <div>
                    <h3>Recent Activity</h3>

                    <p>Latest updates</p>
                  </div>

                  <button
                    type="button"
                    className="view-btn"
                  >
                    View all
                  </button>
                </div>

                <div className="activity-item">
                  <div className="activity-icon blue">
                    ✓
                  </div>

                  <div>
                    <strong>
                      Attendance updated
                    </strong>

                    <p>
                      Computer Science • Today
                    </p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon purple">
                    ★
                  </div>

                  <div>
                    <strong>
                      Results published
                    </strong>

                    <p>
                      Semester 5 • Yesterday
                    </p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon green">
                    +
                  </div>

                  <div>
                    <strong>
                      New student added
                    </strong>

                    <p>
                      Rahul Sharma • 2 hours ago
                    </p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon orange">
                    !
                  </div>

                  <div>
                    <strong>
                      Important notice
                    </strong>

                    <p>
                      Placement preparation • 1 day ago
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bottom-grid">
              <div className="panel quick">
                <div className="panel-header">
                  <div>
                    <h3>Quick Actions</h3>

                    <p>
                      Frequently used features
                    </p>
                  </div>
                </div>

                <div className="quick-actions">
                  <button
                    type="button"
                    onClick={() =>
                      setActive("Students")
                    }
                  >
                    <span>+</span>
                    Add Student
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActive("Attendance")
                    }
                  >
                    <span>✓</span>
                    Mark Attendance
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActive("Results")
                    }
                  >
                    <span>▥</span>
                    Add Result
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActive("Analytics")
                    }
                  >
                    <span>◫</span>
                    View Analytics
                  </button>
                </div>
              </div>

              <div className="panel assistant">
                <div className="assistant-icon">
                  ✦
                </div>

                <div>
                  <span>
                    SVIET AI ASSISTANT
                  </span>

                  <h3>
                    Need help with something?
                  </h3>

                  <p>
                    Ask about academics, attendance,
                    results or college information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActive("Chatbot")
                  }
                >
                  Open Assistant →
                </button>
              </div>
            </section>
          </>
        )}

        {/* STUDENTS */}

        {active === "Students" && (
          <Students />
        )}

        {/* ATTENDANCE */}

        {active === "Attendance" && (
          <Attendance />
        )}

        {/* RESULTS */}

        {active === "Results" && (
          <Results />
        )}

        {/* ANALYTICS */}

        {active === "Analytics" && (
          <Analytics />
        )}

        {/* CHATBOT */}

        {active === "Chatbot" && (
          <Chatbot />
        )}

        {/* OTHER MODULES */}

        {active !== "Dashboard" &&
          active !== "Students" &&
          active !== "Attendance" &&
          active !== "Results" &&
          active !== "Analytics" &&
          active !== "Chatbot" && (
            <section className="placeholder">
              <div className="placeholder-icon">
                ✦
              </div>

              <h2>{active}</h2>

              <p>
                This module is ready for backend API
                integration. We will build this section
                next.
              </p>
            </section>
          )}
      </main>

      <button
        type="button"
        className="chat-button"
        onClick={() => setActive("Chatbot")}
      >
        ✦
      </button>
    </div>
  );
}

export default App;