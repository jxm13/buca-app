require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");

const UserSockets = require("./userSocket.js");
const UserOfflineChat = require("./userOfflineChats.js");

const connection_url = process.env.MONGO_URI;
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB conncted.");
});

io.on("connection", (socket) => {
  socket.on("user-joined-server", ({ userId }) => {
    
    UserSockets.findOne(
      {
        userId: userId,
      },
      (err, found) => {
        if (err) console.log(err);
        if (!found) {
          UserSockets.create(
            {
              userId: userId,
              userSocketId: socket.id,
            },
            (err) => {
              if (err) console.log(err);
            }
          );
        } else if (found) {
          UserSockets.updateOne(
            {
              userId: userId,
            },
            {
              $set: {
                userSocketId: socket.id,
              },
            },
            (err) => {
              if (err) console.log(err);
            }
          );
        }
      }
    );
  });

  socket.on("send-message", (message) => {
    console.log(socket.id, message);
    UserSockets.findOne(
      {
        userId: message.sendTo,
      },
      (err, found) => {
        if (err) console.log(err);
        if (found) {
          console.log(found);
          io.to(found.userSocketId).emit("receive-message", {
            sendTo: message.sendTo,
            sendBy: message.sendBy,
            message: message.message,
            time: message.time,
          });
        } else if (!found) {
          UserOfflineChat.create(
            {
              sendTo: message.sendTo,
              sendBy: message.sendBy,
              message: message.message,
              time: message.time,
            },
            (err) => {
              if (err) console.log(err);
            }
          );
        }
      }
    );
  });

  socket.on("check-online-status", (onlineStatus) => {
    UserSockets.findOne({ userId: onlineStatus.roomUser1 }, (err, found) => {
      if (found) {
        socket.emit("confirm-online-status", { userStatus: "online" });
      } else if (!found) {
        socket.emit("confirm-online-status", { userStatus: "offline" });
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("user Disconnected");
    UserSockets.deleteOne(
      {
        userSocketId: socket.id,
      },
      (err) => {
        if (err) console.log(err);
      }
    );
  });
});


const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
