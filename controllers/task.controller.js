import mongoose from "mongoose";
import { errorHandler } from "../middlewares/errorHandling.js";
import { TaskModel } from "../models/task.model.js";

export const createTask = async (req, res, next) => {
  try {
    const { name, description, doneBy } = req.body;
    const task = await new TaskModel({
      name,
      description,
      doneBy,
    }).save();
    if (!task) errorHandler(400, "Task not found");
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
};

// export const getTask = async (req, res, next) => {
//   const task = await TaskModel.find().populate("doneBy");
//   return res.status(200).json(task);
// };

export const getTask = async (req, res, next) => {
  const task = await TaskModel.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId("639198287c9bd81cfd749ed5"),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "doneBy",
        foreignField: "_id",
        as: "doneBy",
      },
    },
    {
      $unwind: "$doneBy",
    },
    {
      $project: {
        name: 1,
        description: 1,
        doneBy: "$doneBy.name",
      },
    },
  ]);
  return res.status(200).json(task);
};
