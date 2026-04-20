import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    default: () => "BOOK-" + Date.now() + Math.floor(Math.random() * 1000),
    unique: true
  },
  title: String,
  author: String,
  category: String,
  quantity: Number,
  available: Number,
  image: String,
  borrowedCount: { type: Number, default: 0 }
}, { timestamps: true });
 
export default mongoose.model("Book", bookSchema);