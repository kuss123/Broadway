import express from "express";
import dotenv from "dotenv";
import indexRouter from "./routes/index.route.js";
import { db_connect } from "./config/mongoose.js";
import { errorhandler } from "./middlewares/errorHandling.js";

//dotenv config
dotenv.config({ path: ".env" });

//db conxn

const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", indexRouter);

app.use(errorhandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  db_connect();
});
