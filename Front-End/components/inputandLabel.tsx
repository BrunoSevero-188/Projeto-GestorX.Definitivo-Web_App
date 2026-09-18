import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export function InputandLabel({ label, className, containerClassName, id, ...props }: InputProps) {
  return (
    <div className={cn(styleInput.containerPrincipal, containerClassName)}>
      <input
        {...props}
        id={id}
        placeholder=" "
        className={styleInput.containerComponenteinput + " " + cn(className)}
      />

      {label && (
        <label
          htmlFor={id}
          className={styleInput.containerLabel}
        >
          {label}
        </label>
      )}
    </div>
  );
}