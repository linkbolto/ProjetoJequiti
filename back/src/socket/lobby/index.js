import io from "../index.js";

io.on("joinLobby", socket => {
  io.emit("joinedLobby");
});
