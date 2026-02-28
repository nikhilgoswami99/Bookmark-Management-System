import mongoose, { Schema, models } from "mongoose";

const SessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7 * 24 * 60 * 60, // auto-delete after 7 days
  },
});

export default models.Session || mongoose.model("Session", SessionSchema);
