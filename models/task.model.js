import mongoose from "mongoose";
import bcrypt from "bcrypt";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    doneBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model("Task", TaskSchema);
