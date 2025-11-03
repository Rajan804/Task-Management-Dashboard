"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../components/Card";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const pendingTasks = totalTasks - completedTasks;

  const today = new Date();
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    const count = tasks.filter(t => t.dueDate === dateStr).length;
    return { date: dateStr.slice(5), tasks: count };
  }).reverse();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total Tasks" value={totalTasks} />
      <Card title="Completed" value={completedTasks} />
      <Card title="Pending" value={pendingTasks} />

      <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md transition-transform hover:scale-105">
        <h2 className="font-bold mb-2">Tasks Due (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" stroke="gray"/>
            <YAxis allowDecimals={false} stroke="gray"/>
            <Tooltip />
            <Bar dataKey="tasks" fill="#3b82f6" animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
