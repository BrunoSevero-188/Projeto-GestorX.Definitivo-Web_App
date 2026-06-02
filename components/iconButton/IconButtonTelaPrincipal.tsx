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
      iconClassName="w-16 h-16"
      labelClassName="text-center text-sm font-medium leading-none"
      className={`h-32 w-full flex-col justify-center gap-3 border-4 border-amber-800 p-3 transition-transform duration-300 hover:scale-[1.02] ${className}`}
      {...props}
    />
  );
}
