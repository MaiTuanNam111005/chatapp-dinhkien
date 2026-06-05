import dotenv from "dotenv";
dotenv.config();

console.log("DOTENV TEST:", process.env.MONGODB_URI);

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

//Local
// const PORT = process.env.PORT;

//production
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

//==========================================

//Local
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

//production
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? true
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//==========================================

//Local
// Không cần serve frontend

//production
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(
      path.join(__dirname, "frontend/dist")
    )
  );

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "frontend/dist",
        "index.html"
      )
    );
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT: " + PORT);
  connectDB();
});