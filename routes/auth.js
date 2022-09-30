import express from "express";
import User from "../models/users.js";
import bcrypt from "bcrypt";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello from the server");
});
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, work } = req.body;
    if (!name || !email || !password || !confirmPassword || !phone || !work) {
      res.status(422).json({ error: "Please Fill All The Fields" });
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ error: "User Already Exists" });
    }
    //* generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      phone,
      work,
    });
    if (user) {
      res.status(201).json({ user });5
    } else if (password === confirmPassword) {
      res.status(400);
      console.log("Invalid user Data");
    } else {
      res.status(400);
      console.log("Invalid user Data");
    }
  } catch (error) {
    console.log(error);
  }
});

//! login Route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).json({ error: "Please Fill all the Details" });
    }
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      res.status(422).json({ error: "User Already Exists" });
    } else {
      res.status(200).json({ message: "User Logged In SuccessFully" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
