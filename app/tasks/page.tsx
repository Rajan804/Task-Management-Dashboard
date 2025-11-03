"use client";

import { useState, useEffect } from "react";
import TaskModal from "../../components/TaskModal";
import toast, { Toaster } from "react-hot-toast";
import { Task, Status } from "../../types";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState<Task | "new" | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [sortField, setSortField] = useState<keyof Task | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
    setTimeout(() => setLoading(false), 500);
  }, []);

  const saveTasks = (updated: Task[]) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const addTask = (task: Task) => {
    saveTasks([...tasks, task]);
    toast.success("Task added!");
  };

  const updateTask = (updatedTask: Task) => {
    saveTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    toast.success("Task updated!");
  };

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter((t) => t.id !== id));
    toast.error("Task deleted!");
  };

  // Filter, search, sort
  const filteredTasks = tasks
    .filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.assignee.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => (filterStatus === "All" ? true : t.status === filterStatus))
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = String(a[sortField]);
      const valB = String(b[sortField]);
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  if (loading) {
    return (
      <div className="space-y-2 p-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold">Tasks</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded transition-colors duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded transition-colors duration-300"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Status | "All")}
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <button
            onClick={() => setModalOpen("new")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300"
          >
            + New Task
          </button>
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {["title", "priority", "status", "assignee", "dueDate"].map(
                (field) => (
                  <th
                    key={field}
                    className="border-b border-gray-300 dark:border-gray-700 p-2 cursor-pointer transition-colors duration-300"
                    onClick={() => {
                      if (sortField === field) setSortAsc(!sortAsc);
                      else {
                        setSortField(field as keyof Task);
                        setSortAsc(true);
                      }
                    }}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </th>
                )
              )}
              <th className="border-b border-gray-300 dark:border-gray-700 p-2">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <td className="border-b border-gray-200 dark:border-gray-700 p-2">
                  {task.title}
                </td>
                <td className="border-b border-gray-200 dark:border-gray-700 p-2">
                  {task.priority}
                </td>
                <td className="border-b border-gray-200 dark:border-gray-700 p-2">
                  {task.status}
                </td>
                <td className="border-b border-gray-200 dark:border-gray-700 p-2">
                  {task.assignee}
                </td>
                <td className="border-b border-gray-200 dark:border-gray-700 p-2">
                  {task.dueDate}
                </td>
                <td className="border-b border-gray-200 dark:border-gray-700 p-2 flex gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded transition-colors duration-300"
                    onClick={() => setModalOpen(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-300"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4 text-gray-600 dark:text-gray-400"
                >
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Task Modal */}
      {modalOpen !== null && (
        <TaskModal
          task={modalOpen === "new" ? undefined : modalOpen}
          onClose={() => setModalOpen(null)}
          onSave={(task: Task) => {
            if (modalOpen === "new") addTask(task);
            else updateTask(task);
            setModalOpen(null);
          }}
        />
      )}
    </div>
  );
}
