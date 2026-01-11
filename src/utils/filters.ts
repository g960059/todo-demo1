import type { Todo, FilterStatus } from '../types/todo';

export function filterTodos(
  todos: Todo[],
  status: FilterStatus,
  searchQuery: string
): Todo[] {
  return todos
    .filter((todo) => {
      if (status === 'active') return !todo.completed;
      if (status === 'completed') return todo.completed;
      return true;
    })
    .filter((todo) => {
      if (!searchQuery.trim()) return true;
      return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      // Sort: incomplete first, then by priority, then by due date
      if (a.completed !== b.completed) return a.completed ? 1 : -1;

      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      // Due date sorting (null dates last)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;

      return 0;
    });
}
