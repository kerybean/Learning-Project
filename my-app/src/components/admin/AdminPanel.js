// components/admin/AdminPanel.js
import React, { useState } from "react";
import AddBook from "./AddBook";
import Reports from "./Reports";
import "../../styles/Admin.css";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <button
          className={activeTab === "books" ? "active" : ""}
          onClick={() => setActiveTab("books")}
        >
          Manage Books
        </button>
        <button
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>
      </div>
      <div className="admin-content">
        {activeTab === "books" && <AddBook />}
        {activeTab === "reports" && <Reports />}
      </div>
    </div>
  );
}

export default AdminPanel;
