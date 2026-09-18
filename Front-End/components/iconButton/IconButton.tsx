import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

import stylesIconButton from "../../ConjuntosCss/ComponentesCss/IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  iconClassName?: string;
  labelClassName?: string;
  className?: string;
}

export default function IconButton({
  icon: Icon,
  label,
  iconClassName = stylesIconButton.icon,
  labelClassName = stylesIconButton.label,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`${stylesIconButton.button} ${className}`}
      {...props}
    >
      <Icon className={iconClassName} />
      {label && <span className={labelClassName}>{label}</span>}
    </button>
  );
}