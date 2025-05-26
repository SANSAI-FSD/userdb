import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  course: { type: String, required: true },
  description: { type: String, required: true },
});

const User = mongoose.model("Post", userSchema);

export default User;
