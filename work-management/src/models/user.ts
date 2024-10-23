import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  about: String,
  profileUrl: String,
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
