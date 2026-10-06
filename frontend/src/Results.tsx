import { useEffect, useState } from "react";
import axios from "axios";

type Student = {
  id: string;
  name: string;
  rollNo: string;
  branch: string;
};

type Result = {
  id?: string;
  student_id: string;
  student_name: string;
  roll_no: string;
  branch: string;
  semester: number;
  subject: string;
  marks: number;
  grade: string;
};

const students: Student[] = [
  {
    id: "1",
    name: "Vishal Kumar Yadav",
    rollNo: "CSE001",
    branch: "CSE",
  },
  {
    id: "2",
    name: "Chetan Mahto",
    rollNo: "CSE002",
    branch: "CSE",
  },
  {
    id: "3",
    name: "Ravikant Rai",
    rollNo: "CSE003",
    branch: "CSE",
  },
  {
    id: "4",
    name: "Bittu Verma",
    rollNo: "CSE004",
    branch: "CSE",
  },
];

function getGrade(marks: number) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

function Results() {
  const [studentId, setStudentId] = useState("");
  const [semester, setSemester] = useState("5");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedStudent = students.find(
    (student) => student.id === studentId
  );

  const fetchResults = async (id: string) => {
    if (!id) {
      setResults([]);
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      setLoadingResults(true);
      setError("");

      const response = await axios.get(
        `http://127.0.0.1:8000/results/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(response.data);
    } catch (error: any) {
      console.error("Fetch results error:", error);

      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Unable to fetch results.");
      }
    } finally {
      setLoadingResults(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchResults(studentId);
    }
  }, [studentId]);

  const handleSaveResult = async () => {
    setError("");
    setSuccess("");

    if (!selectedStudent) {
      setError("Please select a student.");
      return;
    }

    if (!subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    const marksValue = Number(marks);

    if (
      marks === "" ||
      Number.isNaN(marksValue) ||
      marksValue < 0 ||
      marksValue > 100
    ) {
      setError("Marks must be between 0 and 100.");
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      setLoading(true);

      const resultData = {
        student_id: selectedStudent.id,
        student_name: selectedStudent.name,
        roll_no: selectedStudent.rollNo,
        branch: selectedStudent.branch,
        semester: Number(semester),
        subject: subject.trim(),
        marks: marksValue,
        grade: getGrade(marksValue),
      };

      await axios.post(
        "http://127.0.0.1:8000/results",
        resultData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Result saved successfully.");

      setSubject("");
      setMarks("");

      await fetchResults(selectedStudent.id);
    } catch (error: any) {
      console.error("Save result error:", error);

      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Unable to save result. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const averageMarks =
    results.length > 0
      ? Math.round(
          results.reduce((total, result) => total + result.marks, 0) /
            results.length
        )
      : 0;

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "1px",
            color: "#64748b",
            marginBottom: "8px",
          }}
        >
          ACADEMIC MANAGEMENT
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            color: "#0f172a",
          }}
        >
          Results
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#64748b",
          }}
        >
          Manage student academic results and performance.
        </p>
      </div>

      {error && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "20px",
            borderRadius: "10px",
            background: "#fee2e2",
            color: "#991b1b",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "20px",
            borderRadius: "10px",
            background: "#dcfce7",
            color: "#166534",
            fontSize: "14px",
          }}
        >
          ✓ {success}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "22px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ color: "#64748b", fontSize: "14px" }}>
            Total Results
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              marginTop: "8px",
              color: "#0f172a",
            }}
          >
            {results.length}
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "22px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ color: "#64748b", fontSize: "14px" }}>
            Average Marks
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              marginTop: "8px",
              color: "#0f172a",
            }}
          >
            {averageMarks}%
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "22px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ color: "#64748b", fontSize: "14px" }}>
            Selected Student
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              marginTop: "8px",
              color: "#0f172a",
            }}
          >
            {selectedStudent
              ? selectedStudent.name
              : "No student selected"}
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "26px",
          border: "1px solid #e2e8f0",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "20px",
            fontSize: "20px",
            color: "#0f172a",
          }}
        >
          Add Student Result
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "18px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#334155",
              }}
            >
              Student
            </label>

            <select
              value={studentId}
              onChange={(event) =>
                setStudentId(event.target.value)
              }
              style={inputStyle}
            >
              <option value="">Select student</option>

              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.rollNo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#334155",
              }}
            >
              Semester
            </label>

            <select
              value={semester}
              onChange={(event) =>
                setSemester(event.target.value)
              }
              style={inputStyle}
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#334155",
              }}
            >
              Subject
            </label>

            <input
              type="text"
              placeholder="e.g. DBMS"
              value={subject}
              onChange={(event) =>
                setSubject(event.target.value)
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#334155",
              }}
            >
              Marks
            </label>

            <input
              type="number"
              min="0"
              max="100"
              placeholder="Enter marks out of 100"
              value={marks}
              onChange={(event) =>
                setMarks(event.target.value)
              }
              style={inputStyle}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "#64748b", fontSize: "14px" }}>
            Grade will be calculated automatically.
          </div>

          <button
            onClick={handleSaveResult}
            disabled={loading}
            style={{
              border: "none",
              borderRadius: "9px",
              padding: "12px 22px",
              background: "#0f172a",
              color: "#ffffff",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Saving..." : "Save Result"}
          </button>
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "26px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                color: "#0f172a",
              }}
            >
              Result Records
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Select a student to view saved results.
            </p>
          </div>
        </div>

        {!studentId ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            Select a student to view results.
          </div>
        ) : loadingResults ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            Loading results...
          </div>
        ) : results.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            No results found for this student.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Subject</th>
                  <th style={tableHeaderStyle}>Semester</th>
                  <th style={tableHeaderStyle}>Marks</th>
                  <th style={tableHeaderStyle}>Grade</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td style={tableCellStyle}>
                      {result.subject}
                    </td>

                    <td style={tableCellStyle}>
                      Semester {result.semester}
                    </td>

                    <td style={tableCellStyle}>
                      {result.marks}/100
                    </td>

                    <td style={tableCellStyle}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          background:
                            result.grade === "F"
                              ? "#fee2e2"
                              : "#dcfce7",
                          color:
                            result.grade === "F"
                              ? "#991b1b"
                              : "#166534",
                          fontWeight: 700,
                          fontSize: "13px",
                        }}
                      >
                        {result.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "9px",
  fontSize: "14px",
  outline: "none",
  background: "#ffffff",
};

const tableHeaderStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "13px 12px",
  borderBottom: "1px solid #e2e8f0",
  color: "#64748b",
  fontSize: "13px",
};

const tableCellStyle: React.CSSProperties = {
  padding: "16px 12px",
  borderBottom: "1px solid #f1f5f9",
  color: "#334155",
  fontSize: "14px",
};

export default Results;