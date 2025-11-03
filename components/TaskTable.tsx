'use client'
import { useEffect, useState } from 'react'
import { loadTasks } from '@/lib/storage'

export default function TaskTable() {
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    setTasks(loadTasks())
  }, [])

  return (
    <table className="w-full text-sm bg-white dark:bg-gray-800 rounded shadow">
      <thead>
        <tr className="text-left border-b">
          <th className="p-2">Title</th>
          <th className="p-2">Priority</th>
          <th className="p-2">Status</th>
          <th className="p-2">Assignee</th>
          <th className="p-2">Due Date</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, i) => (
          <tr key={i} className="border-t">
            <td className="p-2">{task.title}</td>
            <td className="p-2">{task.priority}</td>
            <td className="p-2">{task.status}</td>
            <td className="p-2">{task.assignee}</td>
            <td className="p-2">{task.dueDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
