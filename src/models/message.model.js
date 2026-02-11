import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const messageModel = mongoose.model("message", messageSchema);