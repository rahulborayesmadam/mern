import express from "express";
import dotenv from "dotenv";
import database from "./config/database.js";

const app = express();

// !MiddleWares
const middleware = (req, res, next) => {
  console.log("middleware Running");
  next();
};

dotenv.config();
database();

const port = process.env.PORT || 5060;

app.get("/", middleware, (req, res) => {
  console.log("Server Started");
  res.send("Hello from the server");
});

app.listen(port, () => {
  console.log(`Listening to port number ${port}`);
});

export default app;
