// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const bookService = {
  getAllBooks: async () => {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  },

  addBook: async (book) => {
    const response = await axios.post(`${API_URL}/books`, book);
    return response.data;
  },

  updateBook: async (id, book) => {
    const response = await axios.put(`${API_URL}/books/${id}`, book);
    return response.data;
  },

  deleteBook: async (id) => {
    const response = await axios.delete(`${API_URL}/books/${id}`);
    return response.data;
  },

  borrowBook: async (bookId, userId) => {
    try {
      console.log("Calling borrow API:", `${API_URL}/books/${bookId}/borrow`); // Debug log
      const response = await axios.post(`${API_URL}/books/${bookId}/borrow`, {
        userId,
      });
      console.log("API Response:", response); // Debug log
      return response.data;
    } catch (error) {
      console.error("API Error:", error); // Debug log
      throw error;
    }
  },
};
