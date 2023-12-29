const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { connection } = require("./config/db");
const { userController } = require("./routes/user.route");

// const corsOptions = {
//   origin: "https://the-brand-wick-frontend.vercel.app/",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Home Page using router");
});

app.use("/user", userController);

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
