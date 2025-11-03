"use client";

import TeamMemberCard from "../../components/TeamMemberCard";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import { motion } from "framer-motion";

const members = [
  { name: "Alice", role: "Developer" },
  { name: "Bob", role: "Designer" },
  { name: "Charlie", role: "Tester" },
];

export default function TeamPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Count tasks per member
  const membersWithTaskCount = members.map(m => ({
    ...m,
    tasks: tasks.filter(t => t.assignee === m.name).length,
  }));


  {membersWithTaskCount.map((m, idx) => (
  <motion.div
    key={idx}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: idx * 0.1 }}
    className="transition-colors"
  >
    <TeamMemberCard member={m} />
  </motion.div>
))}

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {membersWithTaskCount.map((m, idx) => (
        <TeamMemberCard key={idx} member={m} />
      ))}
    </div>
  );
}
