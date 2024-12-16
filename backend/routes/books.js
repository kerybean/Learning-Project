// backend/routes/books.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Tüm kitapları getir
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM books");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni kitap ekle
router.post("/", async (req, res) => {
  try {
    const { title, author, isbn, quantity, description } = req.body;
    const [result] = await db.query(
      "INSERT INTO books (title, author, isbn, quantity, description) VALUES (?, ?, ?, ?, ?)",
      [title, author, isbn, quantity, description]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kitap güncelle
router.put("/:id", async (req, res) => {
  try {
    const { title, author, isbn, quantity, description } = req.body;
    await db.query(
      "UPDATE books SET title = ?, author = ?, isbn = ?, quantity = ?, description = ? WHERE id = ?",
      [title, author, isbn, quantity, description, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kitap sil
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM books WHERE id = ?", [req.params.id]);
    res.json({ message: "Kitap başarıyla silindi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new route for borrowing
router.post("/:id/borrow", async (req, res) => {
  const connection = await db.getConnection();
  try {
    const bookId = req.params.id;
    const { userId } = req.body;

    await connection.beginTransaction();

    // Check book availability with locking
    const [rows] = await connection.query(
      "SELECT quantity FROM books WHERE id = ? FOR UPDATE",
      [bookId]
    );

    if (!rows.length || rows[0].quantity < 1) {
      throw new Error("Kitap mevcut değil");
    }

    // Update book quantity
    await connection.query(
      "UPDATE books SET quantity = quantity - 1 WHERE id = ?",
      [bookId]
    );

    // Add borrow record
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 15);

    await connection.query(
      "INSERT INTO borrows (book_id, user_id, return_date) VALUES (?, ?, ?)",
      [bookId, userId, returnDate]
    );

    await connection.commit();
    res.json({ message: "Kitap başarıyla ödünç alındı" });
  } catch (error) {
    await connection.rollback();
    console.error("Borrow error:", error);
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
});

module.exports = router;
