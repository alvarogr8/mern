import { useState } from "react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);

  const commitEdit = () => {
    const trimmed = draftTitle.trim();
    if (trimmed && trimmed !== todo.title) {
      onEdit(todo._id, trimmed);
    } else {
      setDraftTitle(todo.title);
    }
    setIsEditing(false);
  };

  return (
    <li className={`todo-item${todo.completed ? " completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(event) => onToggle(todo._id, event.target.checked)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
      />

      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={draftTitle}
          autoFocus
          onChange={(event) => setDraftTitle(event.target.value)}
          onBlur={commitEdit}
          onKeyDown={(event) => {
            if (event.key === "Enter") commitEdit();
            if (event.key === "Escape") {
              setDraftTitle(todo.title);
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <span className="todo-title" onDoubleClick={() => setIsEditing(true)}>
          {todo.title}
        </span>
      )}

      <button
        type="button"
        className="icon-button"
        onClick={() => setIsEditing(true)}
        aria-label="Edit todo"
      >
        ✏️
      </button>
      <button
        type="button"
        className="icon-button"
        onClick={() => onDelete(todo._id)}
        aria-label="Delete todo"
      >
        🗑️
      </button>
    </li>
  );
}
