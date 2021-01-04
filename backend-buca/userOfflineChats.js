const mongoose = require("mongoose");

const userOfflineChatsSchema = mongoose.Schema({
  sendBy: String,
  sendTo: String,
  message: String,
  time: String,
});

module.exports = mongoose.model("userOfflineChat", userOfflineChatsSchema);
