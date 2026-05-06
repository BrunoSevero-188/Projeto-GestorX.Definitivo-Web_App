import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import IconButton from "./IconButton";

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
      iconClassName="w-20 h-20"
      labelClassName="text-center text-sm font-medium leading-none"
      className={`h-36 w-36 flex-col justify-center gap-4 border-4 border-amber-800 p-3 transition-transform duration-300 hover:label ${className}`}
      {...props}
    />
  );
}
