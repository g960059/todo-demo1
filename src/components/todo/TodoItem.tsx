import { useState } from 'react';
import type { Todo } from '../../types/todo';
import { useTodos } from '../../context/TodoContext';
import { Checkbox } from '../ui/Checkbox';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { TodoEditor } from './TodoEditor';
import { formatDate, isOverdue } from '../../utils/date';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);

  const overdue = isOverdue(todo.dueDate) && !todo.completed;

  return (
    <div
      className={`
        flex items-center gap-3 p-4 bg-white rounded-lg border shadow-sm
        transition-all hover:shadow-md
        ${todo.completed ? 'opacity-60' : ''}
        ${overdue ? 'border-red-300' : 'border-gray-200'}
      `}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <TodoEditor
            initialValue={todo.title}
            onSave={(title) => {
              updateTodo(todo.id, { title });
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <p
            className={`
              truncate cursor-pointer
              ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}
            `}
            onDoubleClick={() => setIsEditing(true)}
            title="Double-click to edit"
          >
            {todo.title}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1">
          <Badge priority={todo.priority} />
          {todo.dueDate && (
            <span
              className={`text-xs ${overdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}
            >
              {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          aria-label="Edit todo"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteTodo(todo.id)}
          aria-label="Delete todo"
          className="text-red-600 hover:bg-red-50"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
