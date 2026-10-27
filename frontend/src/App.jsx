import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/employees/";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");

  const getEmployees = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setEmployees(data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const addEmployee = async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        salary,
      }),
    });

    if (!response.ok) {
      alert("Please check employee details and try again.");
      return;
    }

    setName("");
    setEmail("");
    setSalary("");

    getEmployees();
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Employee Management System</h1>

      <form onSubmit={addEmployee}>
        <input
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Employee Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Employee Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          min="0"
          step="0.01"
          required
        />

        <br /><br />

        <button type="submit">Add Employee</button>
      </form>

      <hr />

      <h2>Employee List</h2>

      <table cellPadding="10" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;