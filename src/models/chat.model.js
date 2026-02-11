import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  user_id_1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  user_id_2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const chatModel = mongoose.model("chat", chatSchema);