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
      index: true,
    },
    favicon: {
      type: String,
      default: "",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, 
  }
);

BookmarkSchema.index({ ownerId: 1, createdAt: -1 });

export default models.Bookmark ||
  mongoose.model("Bookmark", BookmarkSchema);
