const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, min: 8, required: true },
  name: { type: String, required: true },
  phone: { type: Number, required: true, min: 10 },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
