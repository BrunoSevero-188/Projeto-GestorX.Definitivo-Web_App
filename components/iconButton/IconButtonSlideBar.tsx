import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import IconButton from "./IconButton";

interface IconButtonSlideBarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
}

export default function IconButtonSlideBar({
  icon,
  label,
  className = "{`w-full ${className}`}",
  ...props
}: IconButtonSlideBarProps) {
  return (
    <IconButton
      icon={icon}
      label={label}
      className={`w-full ${className}`}
      {...props}
    />
  );
}
