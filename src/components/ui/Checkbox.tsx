import type { InputHTMLAttributes } from 'react';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className={`
          w-5 h-5 rounded border-gray-300 text-blue-600
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          cursor-pointer
          ${className}
        `}
        {...props}
      />
      {label && <span className="ml-2 text-gray-700">{label}</span>}
    </label>
  );
}
