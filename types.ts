export type Priority = 'Low' | 'Med' | 'High';
export type Status = 'Pending' | 'In Progress' | 'Completed';

export type Task = {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  assignee: string;
  dueDate: string; // ISO
  description?: string;
};

export type Member = { 
  id?: string; 
  name: string; 
  role: string; 
  avatar?: string; 
  tasks?: number;
};
