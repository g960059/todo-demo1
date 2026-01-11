import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { filterTodos } from '../utils/filters';
import type {
  Todo,
  TodoState,
  TodoStats,
  FilterStatus,
  CreateTodoInput,
  UpdateTodoInput,
} from '../types/todo';

interface TodoContextType extends TodoState {
  filteredTodos: Todo[];
  stats: TodoStats;
  addTodo: (input: CreateTodoInput) => void;
  updateTodo: (id: string, input: UpdateTodoInput) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: FilterStatus) => void;
  setSearchQuery: (query: string) => void;
  clearCompleted: () => void;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: CreateTodoInput }
  | { type: 'UPDATE_TODO'; payload: { id: string; input: UpdateTodoInput } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: FilterStatus }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'LOAD_TODOS'; payload: Todo[] };

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  searchQuery: '',
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO': {
      const now = new Date().toISOString();
      const newTodo: Todo = {
        id: generateId(),
        title: action.payload.title,
        completed: false,
        priority: action.payload.priority ?? 'medium',
        dueDate: action.payload.dueDate ?? null,
        createdAt: now,
        updatedAt: now,
      };
      return { ...state, todos: [newTodo, ...state.todos] };
    }
    case 'UPDATE_TODO': {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                ...action.payload.input,
                updatedAt: new Date().toISOString(),
              }
            : todo
        ),
      };
    }
    case 'DELETE_TODO': {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    }
    case 'TOGGLE_TODO': {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed,
                updatedAt: new Date().toISOString(),
              }
            : todo
        ),
      };
    }
    case 'SET_FILTER': {
      return { ...state, filter: action.payload };
    }
    case 'SET_SEARCH': {
      return { ...state, searchQuery: action.payload };
    }
    case 'CLEAR_COMPLETED': {
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    }
    case 'LOAD_TODOS': {
      return { ...state, todos: action.payload };
    }
    default:
      return state;
  }
}

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>('todos', []);
  const [state, dispatch] = useReducer(todoReducer, {
    ...initialState,
    todos: storedTodos,
  });

  // Sync with localStorage on changes
  useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos, setStoredTodos]);

  const filteredTodos = useMemo(
    () => filterTodos(state.todos, state.filter, state.searchQuery),
    [state.todos, state.filter, state.searchQuery]
  );

  const stats = useMemo<TodoStats>(
    () => ({
      total: state.todos.length,
      active: state.todos.filter((t) => !t.completed).length,
      completed: state.todos.filter((t) => t.completed).length,
    }),
    [state.todos]
  );

  const value: TodoContextType = {
    ...state,
    filteredTodos,
    stats,
    addTodo: (input) => dispatch({ type: 'ADD_TODO', payload: input }),
    updateTodo: (id, input) =>
      dispatch({ type: 'UPDATE_TODO', payload: { id, input } }),
    deleteTodo: (id) => dispatch({ type: 'DELETE_TODO', payload: id }),
    toggleTodo: (id) => dispatch({ type: 'TOGGLE_TODO', payload: id }),
    setFilter: (filter) => dispatch({ type: 'SET_FILTER', payload: filter }),
    setSearchQuery: (query) => dispatch({ type: 'SET_SEARCH', payload: query }),
    clearCompleted: () => dispatch({ type: 'CLEAR_COMPLETED' }),
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
