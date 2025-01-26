import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

// Set environment once at the start
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Set production port fallback
const PORT = process.env.PORT || 5001;

// Validate environment
const validEnvironments = ["development", "production", "test"];
if (!validEnvironments.includes(process.env.NODE_ENV)) {
  console.warn(`Warning: Invalid NODE_ENV '${process.env.NODE_ENV}'. Defaulting to 'development'`);
  process.env.NODE_ENV = "development";
}

// Increase payload size limit for file uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Configure CORS with better production handling
const corsOrigins = process.env.NODE_ENV === "development"
  ? ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://localhost:5176", "http://127.0.0.1:5176"]
  : [process.env.FRONTEND_URL].filter(Boolean);

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 200
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.join(process.cwd(), "frontend/dist");
  console.log("Looking for frontend dist at:", frontendDistPath);
  
  // Ensure the frontend dist directory exists before serving
  if (fs.existsSync(frontendDistPath)) {
    // Serve static files with caching headers
    app.use(express.static(frontendDistPath, {
      maxAge: '1d',
      etag: true
    }));

    // Handle client-side routing for all paths including root
    app.get("*", (req, res) => {
      try {
        const indexPath = path.join(frontendDistPath, "index.html");
        if (fs.existsSync(indexPath)) {
          // Ensure no caching for index.html to prevent stale deployments
          res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          });
          res.sendFile(indexPath);
        } else {
          res.status(404).json({
            error: "Frontend build not found",
            message: "Please run npm run build in the frontend directory"
          });
        }
      } catch (error) {
        console.error("Error serving frontend:", error);
        res.status(500).json({
          error: "Internal server error",
          message: error.message
        });
      }
    });
  } else {
    console.warn("Warning: Frontend dist directory not found at", frontendDistPath);
    app.get("*", (req, res) => {
      res.status(404).json({
        error: "Frontend build not found",
        message: "Please run npm run build in the frontend directory"
      });
    });
  }
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
