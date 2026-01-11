import { TodoProvider, useTodos } from './context/TodoContext';
import { TodoForm } from './components/todo/TodoForm';
import { TodoList } from './components/todo/TodoList';
import { FilterBar } from './components/filters/FilterBar';

function TodoApp() {
  const { stats } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          <p className="text-gray-500 mt-1">
            {stats.active} item{stats.active !== 1 ? 's' : ''} left
          </p>
        </header>

        <main className="space-y-6">
          <TodoForm />
          <FilterBar />
          <TodoList />
        </main>

        <footer className="mt-8 text-center text-sm text-gray-400">
          <p>Double-click a todo to edit it</p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;
