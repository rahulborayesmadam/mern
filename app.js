import express from "express";
import dotenv from "dotenv";
import database from "./config/database.js";
import Auth from "./routes/auth.js";

const app = express();

// !MiddleWares
dotenv.config();
database();

const port = process.env.PORT || 5060;
app.use(express.json());

// !Routes
app.use("/api/", Auth);

app.listen(port, () => {
  console.log(`Listening to port number ${port}`);
});

export default app;
