import React, { useState, useEffect } from "react";

const AdminForm = ({ selectedAdmin, onFormSubmit }) => {
  const BASE_URL = "http://localhost:8080/adminservice";

  const [admin, setAdmin] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    status: false,
    phone: "",
    assignedSection: "",
  });

  useEffect(() => {
    if (selectedAdmin) {
      setAdmin(selectedAdmin);
    } else {
      setAdmin({
        id: "",
        name: "",
        email: "",
        password: "",
        role: "",
        status: false,
        phone: "",
        assignedSection: "",
      });
    }
  }, [selectedAdmin]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdmin({ ...admin, [name]: type === "checkbox" ? checked : value });
  };

  // ✅ Form submit - add or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = selectedAdmin ? "PUT" : "POST";
    const url = selectedAdmin
      ? `${BASE_URL}/${selectedAdmin.id}`
      : BASE_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
      });

      if (!response.ok) throw new Error("Failed to save admin");

      alert(selectedAdmin ? "Admin updated!" : "Admin added!");
      onFormSubmit();
      setAdmin({
        id: "",
        name: "",
        email: "",
        password: "",
        role: "",
        status: false,
        phone: "",
        assignedSection: "",
      });
    } catch (error) {
      console.error("Error saving admin:", error);
      alert("Error saving admin. Please check backend API.");
    }
  };

  return (
    <div className="form-card">
      <h2>{selectedAdmin ? "Update Admin" : "Add New Admin"}</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="number"
          name="id"
          placeholder="ID"
          value={admin.id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={admin.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={admin.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={admin.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={admin.role}
          onChange={handleChange}
          required
        />
        <div className="checkbox-group">
          <label>Status:</label>
          <input
            type="checkbox"
            name="status"
            checked={admin.status}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={admin.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="assignedSection"
          placeholder="Assigned Section"
          value={admin.assignedSection}
          onChange={handleChange}
          required
        />
        <button type="submit">{selectedAdmin ? "Update" : "Add"} Admin</button>
      </form>
    </div>
  );
};

export default AdminForm;
