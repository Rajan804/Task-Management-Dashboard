"use client";

import { useState, useEffect } from "react";
import { Task, Priority, Status } from "../types";

type Props = {
  task?: Task; // undefined = new task
  onClose: () => void;
  onSave: (task: Task) => void;
};

export default function TaskModal({ task, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("Low");
  const [status, setStatus] = useState<Status>("Pending");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  // Populate fields if editing, or reset if new
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setStatus(task.status);
      setAssignee(task.assignee);
      setDueDate(task.dueDate);
      setDescription(task.description || "");
    } else {
      setTitle("");
      setPriority("Low");
      setStatus("Pending");
      setAssignee("");
      setDueDate("");
      setDescription("");
    }
  }, [task]);

  const handleSave = () => {
    if (!title || !assignee || !dueDate) return; // simple validation
    onSave({
      id: task?.id || crypto.randomUUID(),
      title,
      priority,
      status,
      assignee,
      dueDate,
      description: description || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg w-96 shadow-lg transition-transform hover:scale-105">
        <h2 className="text-lg font-bold mb-4">{task ? "Edit Task" : "New Task"}</h2>
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <input
          type="date"
          className="w-full mb-2 p-2 border rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          className="w-full mb-2 p-2 border rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option>Low</option>
          <option>Med</option>
          <option>High</option>
        </select>
        <select
          className="w-full mb-2 p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <textarea
          className="w-full mb-2 p-2 border rounded"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
