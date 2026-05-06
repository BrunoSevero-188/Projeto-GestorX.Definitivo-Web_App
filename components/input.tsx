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

export function Input({ label, className, containerClassName, id, ...props }: InputProps) {
  return (
    <div className={cn("flex flex-col gap-1 w-full relative", containerClassName)}>
      <input
        {...props}
        id={id}
        className={cn(
          "peer w-full border border-black rounded-md px-2.5 py-4 bg-white text-black outline-none ",
          className
        )}
      />
      
      {label && (
        <label 
          htmlFor={id}
           className="absolute left-2.5 top-3.5 text-center text-[18px] text-gray-400 transition-all
           peer-focus:-top-6 peer-focus:text-[18px] peer-focus:text-sm peer-focus:text-black"
        >
          {label}
        </label>
      )}
    </div>
  );
}