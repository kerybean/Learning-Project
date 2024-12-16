import React, { useState } from "react";
import Navbar from "./components/common/Navbar";
import Login from "./components/auth/Login";
import BookList from "./components/books/BookList";
import AdminPanel from "./components/admin/AdminPanel";
import Register from "./components/auth/Register";
import authService from "./services/authService";
import "./styles/App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(authService.getCurrentUser());

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentPage("home");
  };

  return (
    <div className="app">
      <Navbar onNavigate={setCurrentPage} user={user} onLogout={handleLogout} />
      <main className="main-content">
        {currentPage === "login" ? (
          <Login onLogin={handleLogin} />
        ) : currentPage === "register" ? (
          <Register onRegisterSuccess={() => setCurrentPage("login")} />
        ) : currentPage === "admin" && user?.role === "admin" ? (
          <AdminPanel />
        ) : (
          <BookList user={user} />
        )}
      </main>
    </div>
  );
}

export default App;
