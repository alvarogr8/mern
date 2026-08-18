import type { Request, Response, NextFunction } from "express";
import { TodoModel } from "../models/todo.model";

export async function getTodos(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const todos = await TodoModel.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
}

export async function createTodo(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const title =
      typeof req.body.title === "string" ? req.body.title.trim() : "";
    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const todo = await TodoModel.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;
    const updates: { title?: string; completed?: boolean } = {};

    if (req.body.title !== undefined) {
      const title =
        typeof req.body.title === "string" ? req.body.title.trim() : "";
      if (!title) {
        res.status(400).json({ message: "Title cannot be empty" });
        return;
      }
      updates.title = title;
    }

    if (req.body.completed !== undefined) {
      updates.completed = Boolean(req.body.completed);
    }

    const todo = await TodoModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
}

export async function deleteTodo(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findByIdAndDelete(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
