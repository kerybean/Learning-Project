import React from "react";

function Navbar({ onNavigate, user, onLogout }) {
  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem",
      backgroundColor: "#333",
      color: "white",
    },
    logo: {
      display: "flex",
      alignItems: "center",
    },
    links: {
      display: "flex",
      gap: "1rem",
    },
    button: {
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      fontSize: "1rem",
      padding: "0.5rem 1rem",
      transition: "background-color 0.2s",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "#444",
      },
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <button onClick={() => onNavigate("home")} style={styles.button}>
          Library System
        </button>
      </div>
      <div style={styles.links}>
        {!user ? (
          <>
            <button onClick={() => onNavigate("login")} style={styles.button}>
              Login
            </button>
            <button
              onClick={() => onNavigate("register")}
              style={styles.button}
            >
              Register
            </button>
          </>
        ) : (
          <>
            {user.role === "admin" && (
              <button onClick={() => onNavigate("admin")} style={styles.button}>
                Admin
              </button>
            )}
            <button onClick={onLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
