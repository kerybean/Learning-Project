import axios from "axios";
const authService = {
  login: async (email, password) => {
    // Eğer email admin ise otomatik admin rolü ata
    if (email === "admin@abunlibrary.com" && password === "sD5K4iJXdnsdo6H") {
      const userData = {
        email,
        role: "admin",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    }

    const user = await axios.post("http://localhost:5001/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(user.data));
    return user.data;
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === "admin";
  },
};

export default authService;
