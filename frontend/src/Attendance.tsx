import { useState } from "react";
import axios from "axios";

type AttendanceRecord = {
  id: number;
  name: string;
  rollNo: string;
  branch: string;
  percentage: number;
  status: string;
};

const attendanceData: AttendanceRecord[] = [
  {
    id: 1,
    name: "Vishal Kumar Yadav",
    rollNo: "CSE001",
    branch: "CSE",
    percentage: 92,
    status: "Good",
  },
  {
    id: 2,
    name: "Chetan Mahto",
    rollNo: "CSE002",
    branch: "CSE",
    percentage: 84,
    status: "Good",
  },
  {
    id: 3,
    name: "Ravikant Rai",
    rollNo: "CSE003",
    branch: "CSE",
    percentage: 71,
    status: "Average",
  },
  {
    id: 4,
    name: "Bittu Verma",
    rollNo: "CSE004",
    branch: "CSE",
    percentage: 62,
    status: "Low",
  },
];

function Attendance() {
  const [branch, setBranch] = useState("All");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendanceStatus, setAttendanceStatus] =
    useState<Record<number, string>>({});

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredStudents =
    branch === "All"
      ? attendanceData
      : attendanceData.filter(
          (student) => student.branch === branch
        );

  const markAttendance = (
    studentId: number,
    status: string
  ) => {
    setAttendanceStatus((previous) => ({
      ...previous,
      [studentId]: status,
    }));

    setSaved(false);
    setError("");
  };

  const saveAttendance = async () => {
    setError("");
    setSaved(false);

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login again before saving attendance.");
      return;
    }

    const markedStudents = filteredStudents.filter(
      (student) => attendanceStatus[student.id]
    );

    if (markedStudents.length === 0) {
      setError("Please mark attendance for at least one student.");
      return;
    }

    setLoading(true);

    try {
      await Promise.all(
        markedStudents.map((student) =>
          axios.post(
            "http://127.0.0.1:8000/attendance",
            {
              student_id: String(student.id),
              student_name: student.name,
              roll_no: student.rollNo,
              branch: student.branch,
              date: date,
              status: attendanceStatus[student.id],
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      setSaved(true);

      console.log(
        "Attendance saved successfully:",
        attendanceStatus
      );

    } catch (error: any) {
      console.error("Attendance save error:", error);

      if (error.response?.status === 401) {
        setError(
          "Your session has expired. Please login again."
        );
      } else {
        setError(
          "Unable to save attendance. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const presentCount = Object.values(
    attendanceStatus
  ).filter((status) => status === "Present").length;

  const absentCount = Object.values(
    attendanceStatus
  ).filter((status) => status === "Absent").length;

  return (
    <div className="students-page">

      <div className="students-header">

        <div>
          <p className="students-label">
            ATTENDANCE MANAGEMENT
          </p>

          <h2>Attendance</h2>

          <p className="students-subtitle">
            Monitor student attendance and mark daily
            attendance from one place.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >

          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setSaved(false);
              setError("");
            }}
            className="attendance-filter"
          />

          <select
            className="attendance-filter"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="All">
              All Branches
            </option>

            <option value="CSE">
              CSE
            </option>

            <option value="ECE">
              ECE
            </option>

            <option value="ME">
              Mechanical
            </option>

            <option value="CE">
              Civil
            </option>
          </select>

        </div>

      </div>

      <div className="attendance-stats">

        <div className="attendance-stat-card">
          <span>Total Students</span>
          <strong>
            {filteredStudents.length}
          </strong>
          <small>
            Students in selected branch
          </small>
        </div>

        <div className="attendance-stat-card">
          <span>Present</span>
          <strong>
            {presentCount}
          </strong>
          <small>
            Marked present today
          </small>
        </div>

        <div className="attendance-stat-card">
          <span>Absent</span>
          <strong>
            {absentCount}
          </strong>
          <small>
            Marked absent today
          </small>
        </div>

        <div className="attendance-stat-card">
          <span>Average Attendance</span>
          <strong>86%</strong>
          <small>
            Overall attendance
          </small>
        </div>

      </div>

      <div className="students-list-card">

        <div className="students-list-header">

          <div>
            <h3>
              Mark Student Attendance
            </h3>

            <p>
              Select Present or Absent for each student
            </p>
          </div>

          <button
            type="button"
            onClick={saveAttendance}
            disabled={loading}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 600,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Saving..."
              : "Save Attendance"}
          </button>

        </div>

        {error && (
          <div
            style={{
              margin: "0 20px 15px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#fdecec",
              color: "#c62828",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {saved && (
          <div
            style={{
              margin: "0 20px 15px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#e8f7ee",
              color: "#167a42",
              fontSize: "14px",
            }}
          >
            ✓ Attendance saved successfully for{" "}
            {date}
          </div>
        )}

        <div className="student-table-wrapper">

          <table className="student-table">

            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No.</th>
                <th>Branch</th>
                <th>Attendance</th>
                <th>Status</th>
                <th>Mark Attendance</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map((student) => {

                const markedStatus =
                  attendanceStatus[student.id];

                return (
                  <tr key={student.id}>

                    <td>
                      <div className="student-name">

                        <div className="student-avatar">
                          {student.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {student.name}
                        </strong>

                      </div>
                    </td>

                    <td>
                      {student.rollNo}
                    </td>

                    <td>
                      <span className="branch-badge">
                        {student.branch}
                      </span>
                    </td>

                    <td>

                      <div className="attendance-progress">

                        <div className="progress-bar">

                          <div
                            className="progress-fill"
                            style={{
                              width: `${student.percentage}%`,
                            }}
                          />

                        </div>

                        <span>
                          {student.percentage}%
                        </span>

                      </div>

                    </td>

                    <td>

                      <span
                        className={`attendance-status ${student.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {student.status}
                      </span>

                    </td>

                    <td>

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                        }}
                      >

                        <button
                          type="button"
                          onClick={() =>
                            markAttendance(
                              student.id,
                              "Present"
                            )
                          }
                          style={{
                            padding: "7px 12px",
                            borderRadius: "6px",
                            border:
                              "1px solid #22a06b",
                            cursor: "pointer",
                            background:
                              markedStatus === "Present"
                                ? "#22a06b"
                                : "transparent",
                            color:
                              markedStatus === "Present"
                                ? "white"
                                : "#22a06b",
                          }}
                        >
                          Present
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            markAttendance(
                              student.id,
                              "Absent"
                            )
                          }
                          style={{
                            padding: "7px 12px",
                            borderRadius: "6px",
                            border:
                              "1px solid #e05252",
                            cursor: "pointer",
                            background:
                              markedStatus === "Absent"
                                ? "#e05252"
                                : "transparent",
                            color:
                              markedStatus === "Absent"
                                ? "white"
                                : "#e05252",
                          }}
                        >
                          Absent
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Attendance;