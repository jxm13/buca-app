const mongoose = require("mongoose");

const socketSchema = mongoose.Schema({
  userId: String,
  userSocketId: String,
});

module.exports = mongoose.model("userSocket", socketSchema);
