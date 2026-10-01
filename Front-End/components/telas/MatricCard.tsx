import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import IconButtonTelaPrincipal from "@/components/iconButton/IconButtonTelaPrincipal";
import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";

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
    <div className={styleEstrutura.containerItemIconButton}>
      <IconButtonTelaPrincipal icon={icon} label={label} onClick={onClick} />
      {children}
    </div>
  );
}
