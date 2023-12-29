const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { connection } = require("./config/db");
const { userController } = require("./routes/user.route");

app.use(
  cors()
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Home Page using router");
});

app.use("/", userController);

const PORT = 5050;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running at port: ${PORT}`);
});
