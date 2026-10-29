import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getListTasksQueryKey,
  useCreateTask,
  useDeleteTask,
  useListTasks,
  useUpdateTask,
} from "@workspace/api-client-react";

export default function TasksPage() {
  const queryClient = useQueryClient();
  const { data: tasks, isPending, isError, error } = useListTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const refresh = () =>
    queryClient.invalidateQueries({ queryKey: getListTasksQueryKey() });

  const onCreate = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    createTask.mutate(
      {
        data: {
          title: trimmed,
          description: description.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          void refresh();
        },
      },
    );
  };

  return (
    <main>
      <h1>Tasks</h1>
      <p>
        A demo of the redvault stack: Express + PostgreSQL + Drizzle, an
        OpenAPI spec, and Orval-generated React Query hooks. Create, complete,
        and delete tasks below — every change goes through the API.
      </p>

      <form onSubmit={onCreate}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={createTask.isPending}>
          Add task
        </button>
      </form>

      {createTask.isError && (
        <p className="error">Could not create task. Is the API running?</p>
      )}
      {isPending && <p>Loading tasks…</p>}
      {isError && (
        <p className="error">
          Could not load tasks: {String(error)}. Is the API running on port
          8080?
        </p>
      )}

      <ul>
        {(tasks ?? []).map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                updateTask.mutate(
                  {
                    id: task.id,
                    data: { completed: !task.completed },
                  },
                  { onSuccess: () => void refresh() },
                )
              }
            />
            <span className={task.completed ? "done" : undefined}>
              {task.title}
              {task.description ? ` — ${task.description}` : ""}
            </span>
            <button
              onClick={() =>
                deleteTask.mutate(
                  { id: task.id },
                  { onSuccess: () => void refresh() },
                )
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks && tasks.length === 0 && <p>No tasks yet. Add one above.</p>}
    </main>
  );
}
