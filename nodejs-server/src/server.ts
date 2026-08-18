import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT ?? 5000;
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/tododb";

connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
