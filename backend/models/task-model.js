import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum : ["Todo","In Progress","Done"],
      required: true,
    },
    priority: {
      type: String,
      enum : ["Low","Medium","High"],
      required: true,
    },
    due: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = new mongoose.model("Task", taskSchema);
