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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    semester: 1,
  });

  const getToken = () => {
    return localStorage.getItem("access_token");
  };

  const getHeaders = () => {
    return {
      Authorization: `Bearer ${getToken()}`,
    };
  };

  const getStudents = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/students`,
        {
          headers: getHeaders(),
        }
      );

      setStudents(response.data);
    } catch (error) {
      console.error("Get students error:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/students/${editingId}`,
          form,
          {
            headers: getHeaders(),
          }
        );

        alert("Student updated successfully");
      } else {
        await axios.post(
          `${API_URL}/students`,
          form,
          {
            headers: getHeaders(),
          }
        );

        alert("Student added successfully");
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
    } catch (error: any) {
      console.error("Student error:", error);

      if (error.response?.status === 401) {
        alert("Please login again.");
      } else {
        alert("Unable to save student");
      }
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
      await axios.delete(
        `${API_URL}/students/${id}`,
        {
          headers: getHeaders(),
        }
      );

      await getStudents();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete student");
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.phone.toLowerCase().includes(searchText);

    const matchesBranch =
      branchFilter === "" ||
      student.branch === branchFilter;

    const matchesSemester =
      semesterFilter === "" ||
      student.semester.toString() === semesterFilter;

    return (
      matchesSearch &&
      matchesBranch &&
      matchesSemester
    );
  });

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
          type="button"
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
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
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
              {filteredStudents.length} students found
            </p>
          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={getStudents}
          >
            ↻ Refresh
          </button>

        </div>

        {/* SEARCH AND FILTERS */}

        <div className="student-filters">

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={branchFilter}
            onChange={(e) =>
              setBranchFilter(e.target.value)
            }
          >
            <option value="">
              All Branches
            </option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">
              Mechanical
            </option>
            <option value="CE">
              Civil
            </option>
          </select>

          <select
            value={semesterFilter}
            onChange={(e) =>
              setSemesterFilter(e.target.value)
            }
          >
            <option value="">
              All Semesters
            </option>

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

        {filteredStudents.length === 0 ? (

          <div className="empty-students">

            <div className="empty-icon">
              ♙
            </div>

            <h3>No students found</h3>

            <p>
              {students.length === 0
                ? "Add your first student to get started."
                : "Try changing your search or filters."}
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

                {filteredStudents.map(
                  (student) => (

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
                            type="button"
                            className="edit-btn"
                            onClick={() =>
                              editStudent(student)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              deleteStudent(
                                student.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Students;