import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import IconButtonTelaPrincipal from "./IconButtonTelaPrincipal";

interface ItemIconButtonTelaPrincipalProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  children?: ReactNode;
}

export default function ItemIconButtonTelaPrincipal({
  icon,
  label,
  onClick,
  children,
}: ItemIconButtonTelaPrincipalProps) {
  return (
    <div>
      <IconButtonTelaPrincipal icon={icon} label={label} onClick={onClick} />
      {children}
    </div>
  );
}
