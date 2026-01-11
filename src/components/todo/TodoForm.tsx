import { useState, type FormEvent } from 'react';
import type { Priority } from '../../types/todo';
import { useTodos } from '../../context/TodoContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toDateInputValue } from '../../utils/date';

export function TodoForm() {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      priority,
      dueDate: dueDate || null,
    });

    setTitle('');
    setPriority('medium');
    setDueDate('');
  };

  const today = toDateInputValue(new Date());

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            aria-label="Todo title"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={today}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Due date"
          />

          <Button type="submit" disabled={!title.trim()}>
            Add
          </Button>
        </div>
      </div>
    </form>
  );
}
