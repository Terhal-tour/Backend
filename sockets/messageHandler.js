import Message from '../models/Message.js';

const userSockets = new Map(); // userId => socket

export const messageHandler = (io, socket) => {
  socket.on("register", (userId) => {
    console.log("✅ Registered user:", userId);
    userSockets.set(userId, socket);
  });

  socket.on("send_message", async (data) => {
    const { fromUserId, toUserId, message, time } = data;

    if (!fromUserId || !toUserId || !message) {
      return socket.emit("error_saving_message", "Missing required fields");
    }

    try {
      const savedMessage = await Message.create({
        fromUserId,
        toUserId,
        message,
        time: time || Date.now(),
      });

      const targetSocket = userSockets.get(toUserId);
      if (targetSocket) {
        targetSocket.emit("receive_message", savedMessage);
      }

      socket.emit("message_saved", savedMessage);
    } catch (err) {
      console.error("❌ Error saving message:", err);
      socket.emit("error_saving_message", err.message);
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, s] of userSockets.entries()) {
      if (s === socket) {
        userSockets.delete(userId);
        console.log("❌ User disconnected:", userId);
        break;
      }
    }
  });
};
