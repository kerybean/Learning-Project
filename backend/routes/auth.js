const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      birthDate,
      nationalId,
      phone,
    } = req.body;

    // Kullanıcı var mı kontrolü
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ? OR national_id = ?",
      [email, nationalId]
    );

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Email veya TC Kimlik No zaten kayıtlı!" });
    }

    // Yeni kullanıcıyı veritabanına ekle
    const [result] = await db.query(
      `INSERT INTO users (email, password, first_name, last_name, birth_date, national_id, phone, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'user')`,
      [email, password, firstName, lastName, birthDate, nationalId, phone]
    );

    res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin kontrolü
    if (email === "admin@abunlibrary.com" && password === "sD5K4iJXdnsdo6H") {
      return res.json({
        email,
        role: "admin",
      });
    }

    // Normal kullanıcı kontrolü
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Email veya şifre hatalı!" });
    }

    const user = users[0];
    delete user.password;

    res.json(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
