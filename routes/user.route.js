import express from "express";
import {
  forgotPassword,
  getAllUser,
  getOneUser,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const Router = express.Router();

Router.post("/", registerUser);
Router.post("/login", loginUser);
Router.get("/:id", isAuth, getOneUser);
Router.get("/", isAuth, getAllUser);

Router.post("/forgotPassword", forgotPassword);
Router.post("/resetPassword/:token", resetPassword);

export default Router;
