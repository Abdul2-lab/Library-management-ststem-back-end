import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  memberId: {
    type: String,
    default: () => "MEM-" + Date.now() + Math.floor(Math.random() * 1000),
    unique: true
  },
  name: String,
  email: String,
  phone: String
}, { timestamps: true });
 
export default mongoose.model("Member", memberSchema);