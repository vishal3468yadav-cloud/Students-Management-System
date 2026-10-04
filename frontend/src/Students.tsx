import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  semester: number;
};

const API_URL = "http://127.0.0.1:8000";

function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    semester: 1,
  });

  const getStudents = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        `${API_URL}/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      if (editingId) {
        await axios.put(
          `${API_URL}/students/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${API_URL}/students`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        branch: "",
        semester: 1,
      });

      setEditingId(null);
      setShowForm(false);

      await getStudents();

    } catch (error) {
      console.error(error);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const editStudent = (student: Student) => {
    setForm({
      name: student.name,
      email: student.email,
      phone: student.phone,
      branch: student.branch,
      semester: student.semester,
    });

    setEditingId(student.id);
    setShowForm(true);
  };

  const deleteStudent = async (id: string) => {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      await axios.delete(
        `${API_URL}/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getStudents();

    } catch (error) {
      console.error(error);
      alert("Unable to delete student");
    }
  };

  return (
    <div className="students-page">

      <div className="students-header">

        <div>
          <p className="students-label">
            STUDENT MANAGEMENT
          </p>

          <h2>Students</h2>

          <p className="students-subtitle">
            Manage student information and academic details.
          </p>
        </div>

        <button
          className="add-student-btn"
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
          }}
        >
          {showForm ? "× Close" : "+ Add Student"}
        </button>

      </div>

      {showForm && (
        <div className="student-form-card">

          <h3>
            {editingId
              ? "Edit Student"
              : "Add New Student"}
          </h3>

          <form onSubmit={handleSubmit}>

            <div className="student-form-grid">

              <div>
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  type="email"
                  placeholder="student@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label>Phone</label>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label>Branch</label>

                <select
                  value={form.branch}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      branch: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">
                    Select branch
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

              <div>
                <label>Semester</label>

                <select
                  value={form.semester}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      semester: Number(e.target.value),
                    })
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(
                    (semester) => (
                      <option
                        key={semester}
                        value={semester}
                      >
                        Semester {semester}
                      </option>
                    )
                  )}
                </select>
              </div>

            </div>

            <div className="student-form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-student-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Student"
                  : "Save Student"}
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="students-list-card">

        <div className="students-list-header">

          <div>
            <h3>All Students</h3>

            <p>
              {students.length} students found
            </p>
          </div>

          <button
            className="refresh-btn"
            onClick={getStudents}
          >
            ↻ Refresh
          </button>

        </div>

        {students.length === 0 ? (

          <div className="empty-students">

            <div className="empty-icon">
              ♙
            </div>

            <h3>
              No students found
            </h3>

            <p>
              Add your first student to get started.
            </p>

          </div>

        ) : (

          <div className="student-table-wrapper">

            <table className="student-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Branch</th>
                  <th>Semester</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {students.map((student) => (

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
                      {student.email}
                    </td>

                    <td>
                      {student.phone}
                    </td>

                    <td>
                      <span className="branch-badge">
                        {student.branch}
                      </span>
                    </td>

                    <td>
                      Semester {student.semester}
                    </td>

                    <td>

                      <div className="student-actions">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            editStudent(student)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteStudent(student.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

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

export default Students;