const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = Router();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, "grv");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

userController.post("/register", async (req, res) => {
  const { email, password, name, phone } = req.body;
  // Check if the user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .send("Email already in use. Please enter a different email.");
  }
  bcrypt.hash(password, 5, async function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.send("Something went wrong");
    }
    const user = new UserModel({
      email,
      password: hash,
      name,
      phone,
    });
    await user.save();
    res.send("Signup Successful");
  });
});
userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;
  if (!user) {
    res.send("Signup first");
  } else {
    bcrypt.compare(password, hash, function (err, result) {
      // result == true
      if (err) {
        res.send("Something went wrong");
      }
      if (result) {
        const token = jwt.sign({ userId: user._id }, "grv");
        res.send({ messsage: "Login successful", token });
      } else {
        res.send("Invalid credentials");
      }
    });
  }
});

module.exports = { userController };
