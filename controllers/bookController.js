import Book from "../models/Book.js";
import Borrow from "../models/BorrowRecord.js";

// ADD BOOK
export const addBook = async (req, res) => {
  const { title, author, category, quantity } = req.body;

  const book = await Book.create({
    title,
    author,
    category,
    quantity,
    available: quantity,
    image: req.file?.path
  });

  res.json({ message: "Book Added", book });
};

// GET ALL BOOKS
export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// SEARCH BOOK
export const searchBook = async (req, res) => {
  const key = req.query.q;

  const books = await Book.find({
    title: { $regex: key, $options: "i" }
  });

  res.json(books);
};

// DASHBOARD STATS
export const dashboardStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalBorrowed = await Borrow.countDocuments();
    const borrowedBooks = await Borrow.countDocuments({ status: "borrowed" });
    const returnedBooks = await Borrow.countDocuments({ status: "returned" });

    res.json({
      totalBooks,
      totalBorrowed,
      borrowedBooks,
      returnedBooks
    });

  } catch (err) {
    res.json({ error: err.message });
  }
};
