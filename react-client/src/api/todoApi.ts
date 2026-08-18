import type { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo";

const API_BASE_URL = `${import.meta.env.VITE_API_URL ?? "/api"}/todos`;

interface ApiErrorBody {
  message?: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body: ApiErrorBody | null = await res.json().catch(() => null);
    throw new Error(
      body?.message ?? `Request failed with status ${res.status}`,
    );
  }
  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}

export function fetchTodos(): Promise<Todo[]> {
  return fetch(API_BASE_URL).then((res) => handleResponse<Todo[]>(res));
}

export function createTodo(input: CreateTodoInput): Promise<Todo> {
  return fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  }).then((res) => handleResponse<Todo>(res));
}

export function updateTodo(id: string, input: UpdateTodoInput): Promise<Todo> {
  return fetch(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  }).then((res) => handleResponse<Todo>(res));
}

export function deleteTodo(id: string): Promise<void> {
  return fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" }).then((res) =>
    handleResponse<void>(res),
  );
}
