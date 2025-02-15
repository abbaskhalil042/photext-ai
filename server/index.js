import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./config/mongodb.js";
import router from "./routes/user.routes.js";
import imageRouter from "./routes/image.routes.js";

// Load environment variables as early as possible
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
await connect();

// Routes
app.use("/api/user", router); // http://localhost:5000/api/user/register
app.use("/api/image", imageRouter); // http://localhost:5000/api/user/login

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET || "Not defined"}`);
});
