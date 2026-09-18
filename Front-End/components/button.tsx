import { ButtonHTMLAttributes } from "react";
import styles from "@/ConjuntosCss/ComponentesCss/Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={styles.containerbotao}>
      {children}
    </button>
  );
}