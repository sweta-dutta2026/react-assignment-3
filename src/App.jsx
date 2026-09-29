import { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ananya Sharma",
      employeeId: "EMP001",
      department: "IT",
      gender: "Female",
      phone: "9876543210",
      localAddress: "Salt Lake, Kolkata",
      permanentAddress: "Durgapur, West Bengal",
    },
    {
      id: 2,
      name: "Rahul Das",
      employeeId: "EMP002",
      department: "HR",
      gender: "Male",
      phone: "9123456780",
      localAddress: "New Town, Kolkata",
      permanentAddress: "Siliguri, West Bengal",
    },
    {
      id: 3,
      name: "Priya Singh",
      employeeId: "EMP003",
      department: "Finance",
      gender: "Female",
      phone: "9830012345",
      localAddress: "Ballygunge, Kolkata",
      permanentAddress: "Patna, Bihar",
    },
  ]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "IT",
    gender: "Male",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();

    const newEmployee = {
      id: Date.now(),
      ...formData,
    };

    setEmployees([...employees, newEmployee]);

    setFormData({
      name: "",
      employeeId: "",
      department: "IT",
      gender: "Male",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter((employee) => employee.id !== id)
      );
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee.id);

    setFormData({
      name: employee.name,
      employeeId: employee.employeeId,
      department: employee.department,
      gender: employee.gender,
      phone: employee.phone,
      localAddress: employee.localAddress,
      permanentAddress: employee.permanentAddress,
    });

    setShowForm(true);
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();

    setEmployees(
      employees.map((employee) =>
        employee.id === editingEmployee
          ? {
              ...employee,
              ...formData,
            }
          : employee
      )
    );

    setEditingEmployee(null);

    setFormData({
      name: "",
      employeeId: "",
      department: "IT",
      gender: "Male",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });

    setShowForm(false);
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.employeeId
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="app">

      <header className="header">
        <div>
          <h1>Employee Directory</h1>
          <p>Manage your farm employees easily</p>
        </div>

        <button
          className="add-btn"
          onClick={() => {
            setShowForm(true);
            setEditingEmployee(null);
          }}
        >
          + Add Employee
        </button>
      </header>

      <div className="stats">

        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>

        <div className="stat-card">
          <h3>IT Department</h3>
          <p>
            {
              employees.filter(
                (employee) => employee.department === "IT"
              ).length
            }
          </p>
        </div>

        <div className="stat-card">
          <h3>HR Department</h3>
          <p>
            {
              employees.filter(
                (employee) => employee.department === "HR"
              ).length
            }
          </p>
        </div>

        <div className="stat-card">
          <h3>Finance</h3>
          <p>
            {
              employees.filter(
                (employee) => employee.department === "Finance"
              ).length
            }
          </p>
        </div>

      </div>

      <div className="controls">

        <input
          type="text"
          placeholder="Search by name or employee ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </select>

      </div>

      {showForm && (
        <div className="form-container">

          <h2>
            {editingEmployee
              ? "Edit Employee"
              : "Add New Employee"}
          </h2>

          <form
            onSubmit={
              editingEmployee
                ? handleUpdateEmployee
                : handleAddEmployee
            }
          >

            <div className="form-grid">

              <div>
                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Employee ID</label>

                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Department</label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">
                    Operations
                  </option>
                </select>
              </div>

              <div>
                <label>Gender</label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Local Address</label>

                <input
                  type="text"
                  name="localAddress"
                  value={formData.localAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="full-width">
                <label>Permanent Address</label>

                <input
                  type="text"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-buttons">

              <button
                type="submit"
                className="save-btn"
              >
                {editingEmployee
                  ? "Update Employee"
                  : "Add Employee"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingEmployee(null);
                }}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="employee-section">

        <div className="section-title">
          <h2>Employees</h2>

          <span>
            {filteredEmployees.length} employee(s)
          </span>
        </div>

        {filteredEmployees.length === 0 ? (

          <div className="no-results">
            <h3>No Employees Found</h3>
            <p>
              Try changing your search or department filter.
            </p>
          </div>

        ) : (

          <div className="employee-grid">

            {filteredEmployees.map((employee) => (

              <div
                className="employee-card"
                key={employee.id}
              >

                <div className="employee-top">

                  <div className="avatar">
                    {employee.name.charAt(0)}
                  </div>

                  <div>
                    <h3>{employee.name}</h3>
                    <p>{employee.employeeId}</p>
                  </div>

                </div>

                <div className="employee-info">

                  <p>
                    <strong>Department:</strong>{" "}
                    {employee.department}
                  </p>

                  <p>
                    <strong>Gender:</strong>{" "}
                    {employee.gender}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {employee.phone}
                  </p>

                  <p>
                    <strong>Local Address:</strong>{" "}
                    {employee.localAddress}
                  </p>

                  <p>
                    <strong>Permanent Address:</strong>{" "}
                    {employee.permanentAddress}
                  </p>

                </div>

                <div className="card-buttons">

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(employee.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default App;