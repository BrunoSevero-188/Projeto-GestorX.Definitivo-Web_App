import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import IconButton from "./IconButton";

import stylesIconButton from "@ConjuntosCss/ComponentesCss/IconButton.module.css";

interface IconButtonTelaPrincipalProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
}

export default function IconButtonTelaPrincipal({
  icon,
  label,
  className = "",
  ...props
}: IconButtonTelaPrincipalProps) {
  return (
    <IconButton
      icon={icon}
      label={label}
      iconClassName={`${stylesIconButton.icon} w-10 h-10`}
      labelClassName={stylesIconButton.telaPrincipalLabel}
      className={`${stylesIconButton.telaPrincipal} ${className}`}
      {...props}
    />
  );
}
