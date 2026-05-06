import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  iconClassName?: string;
  labelClassName?: string;
  classname?: string;
}

export default function IconButton({
  icon: Icon,
  label,
  iconClassName = "w-5 h-5",
  labelClassName = "text-sm font-medium",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center gap-3 rounded-md bg-amber-700 p-2 text-white transition-colors hover:bg-amber-800 hover:text-gray-300 ${className}`}
      {...props}
    >
      <Icon className={iconClassName} />
      {label && <span className={labelClassName}>{label}</span>}
    </button>
  );
}
