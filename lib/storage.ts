// import { Task } from '../types'

import { Task } from "@/types"

// const KEY = 'taskflow_tasks_v1'

// export function loadTasks(): Task[]{
//   try{
//     const raw = localStorage.getItem(KEY)
//     if(!raw) return []
//     return JSON.parse(raw)
//   }catch(e){ return [] }
// }

// export function saveTasks(tasks: Task[]){
//   localStorage.setItem(KEY, JSON.stringify(tasks))
// }

// export function uid(){ return Math.random().toString(36).slice(2,9) }



export const loadTasks = () => {
  const tasks: Task[] = loadTasks()

  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('tasks') || '[]')
}

export const saveTasks = (tasks: any[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
}
