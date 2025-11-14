import React, { useState, useEffect } from "react";
import AdminForm from "./components/AdminForm";
import AdminList from "./components/AdminList";
import "./App.css";

const App = () => {
  const BASE_URL = "http://localhost:8080/adminservice";
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // ✅ Fetch all admins
  const fetchAdmins = async () => {
    try {
      const response = await fetch(BASE_URL);
      // if (!response.ok) throw new Error("Failed to fetch admins");
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // ✅ Delete admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete admin");
      fetchAdmins(); // refresh list
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  // ✅ Edit admin (prefill form)
  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
  };

  // ✅ After form submit, reset form and refresh
  const handleFormSubmit = () => {
    setSelectedAdmin(null);
    fetchAdmins();
  };

  return (
    <div className="container">
      <h1>Admin Management</h1>
      <AdminForm
        selectedAdmin={selectedAdmin}
        onFormSubmit={handleFormSubmit}
      />
      <AdminList admins={admins} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;
