import type { FilterStatus } from '../../types/todo';
import { useTodos } from '../../context/TodoContext';
import { SearchBar } from './SearchBar';
import { Button } from '../ui/Button';

export function FilterBar() {
  const { filter, setFilter, stats, clearCompleted } = useTodos();

  const filters: { value: FilterStatus; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: stats.total },
    { value: 'active', label: 'Active', count: stats.active },
    { value: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="space-y-3">
      <SearchBar />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {filters.map(({ value, label, count }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                ${
                  filter === value
                    ? 'bg-white shadow text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {stats.completed > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCompleted}>
            Clear completed
          </Button>
        )}
      </div>
    </div>
  );
}
