import { useEffect, useState } from "react";
import axios from "axios";

interface AnalyticsData {
  total_students: number;
  average_attendance: number;
  average_marks: number;
  total_results: number;
}

function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await axios.get(
          "http://127.0.0.1:8000/analytics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <section className="placeholder">
        <div className="placeholder-icon">◫</div>
        <h2>Loading Analytics...</h2>
        <p>Fetching analytics data from the backend.</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="placeholder">
        <div className="placeholder-icon">!</div>
        <h2>Analytics Error</h2>
        <p>{error || "No analytics data available."}</p>
      </section>
    );
  }

  return (
    <section>
      <div className="hero">
        <div>
          <span className="hero-label">ACADEMIC ANALYTICS</span>

          <h2>Understand your academic performance.</h2>

          <p>
            View student, attendance and result statistics
            from one centralized analytics dashboard.
          </p>
        </div>

        <div className="hero-mark">DATA</div>
      </div>

      <section className="stats">
        <div className="stat-card">
          <div className="stat-top">
            <span>Total Students</span>
            <b>♙</b>
          </div>

          <h2>{data.total_students}</h2>

          <p className="positive">
            Current student records
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Average Attendance</span>
            <b>✓</b>
          </div>

          <h2>{data.average_attendance}%</h2>

          <p className="positive">
            Overall attendance
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Average Marks</span>
            <b>★</b>
          </div>

          <h2>{data.average_marks}</h2>

          <p className="positive">
            Overall academic performance
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Total Results</span>
            <b>▥</b>
          </div>

          <h2>{data.total_results}</h2>

          <p className="neutral">
            Result records
          </p>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel performance">
          <div className="panel-header">
            <div>
              <h3>Performance Overview</h3>

              <p>
                Current academic statistics
              </p>
            </div>
          </div>

          <div className="chart">
            <div className="bar-group">
              <div
                className="bar"
                style={{
                  height: `${Math.min(
                    data.average_attendance,
                    100
                  )}%`,
                }}
              />

              <span>Attendance</span>
            </div>

            <div className="bar-group">
              <div
                className="bar"
                style={{
                  height: `${Math.min(
                    data.average_marks,
                    100
                  )}%`,
                }}
              />

              <span>Marks</span>
            </div>

            <div className="bar-group">
              <div
                className="bar"
                style={{
                  height: `${Math.min(
                    data.total_students * 10,
                    100
                  )}%`,
                }}
              />

              <span>Students</span>
            </div>

            <div className="bar-group">
              <div
                className="bar"
                style={{
                  height: `${Math.min(
                    data.total_results * 10,
                    100
                  )}%`,
                }}
              />

              <span>Results</span>
            </div>
          </div>
        </div>

        <div className="panel activity">
          <div className="panel-header">
            <div>
              <h3>Analytics Summary</h3>

              <p>
                Key academic insights
              </p>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon blue">
              ✓
            </div>

            <div>
              <strong>Attendance</strong>

              <p>
                Average attendance is{" "}
                {data.average_attendance}%.
              </p>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon purple">
              ★
            </div>

            <div>
              <strong>Academic Performance</strong>

              <p>
                Average marks are {data.average_marks}.
              </p>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon green">
              +
            </div>

            <div>
              <strong>Students</strong>

              <p>
                {data.total_students} student records
                are available.
              </p>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon orange">
              ▥
            </div>

            <div>
              <strong>Results</strong>

              <p>
                {data.total_results} result records
                are available.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Analytics;