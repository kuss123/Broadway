import express from "express";
import { createTask, getTask } from "../controllers/task.controller.js";

const Router = express.Router();

Router.post("/", createTask);

Router.get("/", getTask);

export default Router;
