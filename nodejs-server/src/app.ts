import express, { type Application } from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import { errorHandler } from "./middleware/errorHandler";

const app: Application = express();

app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/todos", todoRoutes);

app.use(errorHandler);

export default app;
