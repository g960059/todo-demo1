export type Priority = 'high' | 'medium' | 'low';

export type FilterStatus = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoInput {
  title: string;
  priority?: Priority;
  dueDate?: string | null;
}

export interface UpdateTodoInput {
  title?: string;
  completed?: boolean;
  priority?: Priority;
  dueDate?: string | null;
}

export interface TodoState {
  todos: Todo[];
  filter: FilterStatus;
  searchQuery: string;
}

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
}
