import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    googleId: { type: String, required: true, unique: true },
    name: String,
    email: { type: String, required: true, unique: true },
    image: String,
  },
  { timestamps: true },
);

export default models.User || mongoose.model("User", UserSchema);
