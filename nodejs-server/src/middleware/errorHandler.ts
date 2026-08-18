import type { Request, Response, NextFunction } from "express";

// Express recognizes error middleware by its 4-argument arity, so all params must stay declared.
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
}
