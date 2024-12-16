import React, { useState } from "react";
import { bookService } from "../../services/api";
import "../../styles/Admin.css";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: 1,
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await bookService.addBook(book);
      setSuccess(true);
      // Form temizleme
      setBook({
        title: "",
        author: "",
        isbn: "",
        quantity: 1,
        description: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-form">
      <h3>Yeni Kitap Ekle</h3>
      {success && (
        <div className="success-message">Kitap başarıyla eklendi!</div>
      )}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Kitap Adı:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Yazar:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ISBN:</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Adet:</label>
          <input
            type="number"
            name="quantity"
            value={book.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Açıklama:</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Ekleniyor..." : "Kitap Ekle"}
        </button>
      </form>
    </div>
  );
}

export default AddBook;
