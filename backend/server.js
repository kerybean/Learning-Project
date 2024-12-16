const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const booksRouter = require("./routes/books");
const authRouter = require("./routes/auth"); // Yeni eklenen

app.use("/api/books", booksRouter);
app.use("/api/auth", authRouter); // Yeni eklenen

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    status: "error",
    message: err.message || "Something went wrong!",
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
