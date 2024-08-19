import express from "express";
import { errorHandler, notFound } from "./utils/error.utils";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Routes from "./routes";
import connectDB from "./config/connectDb";
import swaggerDocs from "./utils/swagger.utils";
import { morganSetup } from "./config/morgan.config";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

if (!process.env.SESSION_SECRET)
  throw new Error("SESSION SECRET IS NOT DEFINED");

connectDB();

const app = express();
const server = http.createServer(app);
export const io = new Server(server);
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

swaggerDocs(app);
morganSetup(app);
Routes(app);

// Socket io area
io.on("connection", (socket) => {
  // Join the conversation
  socket.on("conversation-join", (conversationID) => {
    socket.join(conversationID);
  });

  // Leave the conversation
  socket.on("conversation-leave", (conversationID) => {
    socket.leave(conversationID);
  });

  socket.on("conversation-messages", (messages) => {
    console.log(messages);
  });

  // socket.emit("conversation-leave", conversationID);
  // socket.off("conversation-join");
  // socket.off("conversation-message");
});

app.use(notFound);
app.use(errorHandler);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
