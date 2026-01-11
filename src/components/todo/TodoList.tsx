import { useTodos } from '../../context/TodoContext';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const { filteredTodos, stats, filter } = useTodos();

  if (stats.total === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 mx-auto text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <p className="text-gray-500 text-lg">No todos yet</p>
        <p className="text-gray-400 text-sm mt-1">Add a todo to get started!</p>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    const message =
      filter === 'active'
        ? 'No active todos'
        : filter === 'completed'
          ? 'No completed todos'
          : 'No matching todos';

    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
