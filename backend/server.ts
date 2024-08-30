import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoconnect from "./db.js";
import authRoutes from "./routes/userRoutes.js"; // Ensure the path is correct
import courseRoutes from "./routes/courseRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import bodyParser from "body-parser";
import messageRoutes from "./routes/messageRoutes.js";
import { app, server } from "./socket/socket.js";
const PORT = 8000;

// Connect to the database
mongoconnect();

// Middleware
const allowedOrigins = [
  "http://localhost:3000", // User-facing frontend
  "http://localhost:5173", // Admin panel frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/user", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/message", messageRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
