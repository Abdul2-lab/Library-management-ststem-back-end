import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  issueDate: { type: Date, default: Date.now },
  returnDate: Date,
  dueDate: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
  },
  fine: { type: Number, default: 0 },
  status: { type: String, default: "borrowed" }
});
 
export default mongoose.model("BorrowRecord", borrowSchema);