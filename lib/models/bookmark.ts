import mongoose, { Schema, models } from "mongoose";

const BookmarkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    favicon: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true, // creates createdAt and updatedAt automatically
  }
);

export default models.Bookmark ||
  mongoose.model("Bookmark", BookmarkSchema);
