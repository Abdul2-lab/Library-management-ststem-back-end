import Borrow from "../models/BorrowRecord.js";
import Book from "../models/Book.js";

// BORROW BOOK
export const borrowBook = async (req, res) => {
  const { bookId } = req.body;

  const book = await Book.findById(bookId);

  if (!book || book.available <= 0) {
    return res.json({ message: "Book not available" });
  }

  book.available -= 1;
  book.borrowedCount += 1;
  await book.save();

  const record = await Borrow.create({
    userId: req.user.id,
    bookId
  });

  res.json({ message: "Book Borrowed", record });
};

// RETURN BOOK
export const returnBook = async (req, res) => {
  const record = await Borrow.findById(req.params.id);
  const book = await Book.findById(record.bookId);

  const now = new Date();
  const diffDays = Math.floor((now - record.issueDate) / (1000 * 60 * 60 * 24));

  let fine = 0;
  if (diffDays > 7) {
    fine = (diffDays - 7) * 20;
  }

  record.returnDate = now;
  record.fine = fine;
  record.status = "returned";

  await record.save();

  book.available += 1;
  await book.save();

  res.json({ message: "Book Returned", fine, record });
};
export const borrowHistory = async (req, res) => {
  const records = await Borrow.find({ userId: req.user.id });

  res.json(records);
};
// GET TOTAL FINE REPORT
export const getFineReport = async (req, res) => {
  try {
    const records = await Borrow.find({ status: "returned" });

    let totalFine = 0;

    records.forEach((r) => {
      totalFine += r.fine;
    });

    res.json({
      totalFine,
      totalRecords: records.length,
      records
    });

  } catch (err) {
    res.json({ error: err.message });
  }
};