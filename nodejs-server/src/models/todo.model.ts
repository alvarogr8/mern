import { Schema, model, type InferSchemaType } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export type Todo = InferSchemaType<typeof todoSchema>;

export const TodoModel = model("Todo", todoSchema);
