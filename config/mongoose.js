import mongoose from "mongoose";

export const db_connect = () => {
  mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Database connected Successfully");
  });
};
