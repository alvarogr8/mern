import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { createTodo, deleteTodo, fetchTodos, updateTodo } from "./api/todoApi";
import type { Todo } from "./types/todo";

type Filter = "all" | "active" | "completed";

const FILTERS: Filter[] = ["all", "active", "completed"];

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchTodos()
      .then((data) => {
        if (!cancelled) setTodos(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleAdd = useCallback(async (title: string) => {
    setError(null);
    try {
      const newTodo = await createTodo({ title });
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const handleToggle = useCallback(
    async (id: string, completed: boolean) => {
      setError(null);
      const previous = todos;
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? { ...todo, completed } : todo)),
      );
      try {
        await updateTodo(id, { completed });
      } catch (err) {
        setTodos(previous);
        setError((err as Error).message);
      }
    },
    [todos],
  );

  const handleEdit = useCallback(
    async (id: string, title: string) => {
      setError(null);
      const previous = todos;
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? { ...todo, title } : todo)),
      );
      try {
        await updateTodo(id, { title });
      } catch (err) {
        setTodos(previous);
        setError((err as Error).message);
      }
    },
    [todos],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      setError(null);
      const previous = todos;
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      try {
        await deleteTodo(id);
      } catch (err) {
        setTodos(previous);
        setError((err as Error).message);
      }
    },
    [todos],
  );

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  return (
    <div className="app">
      <h1>TODO List</h1>
      <TodoForm onAdd={handleAdd} />

      {error && <p className="error-banner">{error}</p>}

      <div className="filters">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            className={filter === option ? "active" : ""}
            onClick={() => setFilter(option)}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="loading-state">Loading todos…</p>
      ) : (
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <p className="summary">
        {remainingCount} item{remainingCount === 1 ? "" : "s"} left
      </p>
    </div>
  );
}

export default App;
