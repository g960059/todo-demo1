import type { Priority } from '../../types/todo';

interface BadgeProps {
  priority: Priority;
}

const priorityStyles = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-amber-100 text-amber-800 border-amber-200',
  low: 'bg-green-100 text-green-800 border-green-200',
};

const priorityLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export function Badge({ priority }: BadgeProps) {
  return (
    <span
      className={`
        px-2 py-0.5 text-xs font-medium rounded-full border
        ${priorityStyles[priority]}
      `}
    >
      {priorityLabels[priority]}
    </span>
  );
}
