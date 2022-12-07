import express from "express";
import {
  forgotPassword,
  getOneUser,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller.js";

const Router = express.Router();

Router.post("/", registerUser);
Router.post("/login", loginUser);
Router.get("/:id", getOneUser);
Router.post("/forgotPassword", forgotPassword);
Router.post("/resetPassword/:token", resetPassword);

export default Router;
