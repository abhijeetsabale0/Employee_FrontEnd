import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    axios.get("/api/employees").then((res) => setEmployees(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/employees", form);
    const res = await axios.get("http://localhost:8080/api/employees");
    setEmployees(res.data);
    setForm({ name: "", email: "" });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Employee Manager</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" required />
        <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" required />
        <button type="submit">Add</button>
      </form>
      <ul>
        {employees.map(emp => <li key={emp.id}>{emp.name} ({emp.email})</li>)}
      </ul>
    </div>
  );
}

export default App;
