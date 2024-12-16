import React, { useState, useEffect } from "react";
import { bookService } from "../../services/api";
import "../../styles/BookList.css";

function BookList({ user }) {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      console.error("Book loading error:", err);
      setError("There was an error loading the books: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await bookService.deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Deletion error:", err);
      setError("There was an error deleting the book:" + err.message);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      console.log("Borrowing book:", bookId); // Debug log
      const response = await bookService.borrowBook(bookId, user.email);
      console.log("Borrow response:", response); // Debug log

      // Reload books after successful borrow
      await loadBooks();

      // Update UI
      const borrowDate = new Date();
      const returnDate = new Date(borrowDate);
      returnDate.setDate(returnDate.getDate() + 15);

      setBorrowedBooks({
        ...borrowedBooks,
        [bookId]: {
          borrowDate,
          returnDate,
          userId: user.email,
        },
      });

      alert(
        `Book borrowed successfully. Return date: ${returnDate.toLocaleDateString()}`
      );
    } catch (err) {
      console.error("Borrow error:", err); // Debug log
      setError("An error occurred while borrowing a book: " + err.message);
    }
  };

  const renderBookActions = (book) => {
    if (!user) return null;

    if (user.role === "admin") {
      return (
        <div className="book-actions">
          <button onClick={() => setEditingBook(book)}>Düzenle</button>
          <button onClick={() => handleDelete(book.id)}>Sil</button>
        </div>
      );
    }

    const isBorrowed = borrowedBooks[book.id];
    const isAvailable = book.quantity > 0;

    return (
      <div className="book-actions">
        <button
          className="borrow-button"
          onClick={() => handleBorrow(book.id)}
          disabled={!isAvailable || isBorrowed}
        >
          {isBorrowed ? "Borrowed" : isAvailable ? "Borrow" : "Out of Stock"}
        </button>
        {isBorrowed && (
          <p className="return-date">
            İade Tarihi:{" "}
            {borrowedBooks[book.id].returnDate.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  };

  const renderBooks = () => {
    return (
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>Yazar: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Stok: {book.quantity}</p>
            {renderBookActions(book)}
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={loadBooks}>Try Again</button>
      </div>
    );

  return (
    <div className="book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>There are no books available yet.</p>
      ) : (
        renderBooks()
      )}
    </div>
  );
}

export default BookList;
