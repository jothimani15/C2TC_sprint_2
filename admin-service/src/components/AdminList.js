import React from "react";

const AdminList = ({ admins, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Admin List</h2>
      <div className="card-grid">
        {admins.length > 0 ? (
          admins.map((admin) => (
            <div key={admin.id} className="admin-card">
              <h3>{admin.name}</h3>
              <p><strong>Email:</strong> {admin.email}</p>
              <p><strong>Role:</strong> {admin.role}</p>
              <p><strong>Status:</strong> {admin.status ? "Active" : "Inactive"}</p>
              <p><strong>Phone:</strong> {admin.phone}</p>
              <p><strong>Section:</strong> {admin.assignedSection}</p>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => onEdit(admin)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(admin.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No admins available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminList;
