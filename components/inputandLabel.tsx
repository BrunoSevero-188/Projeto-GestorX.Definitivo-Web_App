import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export function InputandLabel({ label, className, containerClassName, id, ...props }: InputProps) {
  return (
    <div className={`input-container ${containerClassName || ''}`}>
      <input
        {...props}
        id={id}
        placeholder=" "
        className={`input-field ${className || ''}`}
      />
      
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
    </div>
  );
}