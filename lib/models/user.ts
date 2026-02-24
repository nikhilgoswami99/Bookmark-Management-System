import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    profilePic: {
      type: String,
      default: "https://st5.depositphotos.com/1915171/64699/v/950/depositphotos_646996714-stock-illustration-user-profile-icon-vector-avatar.jpg",
    },
  },
  { timestamps: true }
);


export default models.User || mongoose.model("User", UserSchema);