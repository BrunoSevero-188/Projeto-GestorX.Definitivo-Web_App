"use client";

import { LucideIcon } from "lucide-react";

import styles from "../ComponentesCss/Botoes.module.css";

interface IconButtonProps {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
}

export default function IconButton({
    icon: Icon,
    label,
    onClick
}: IconButtonProps) {

    return (
        <button
            className={styles.iconButton}
            onClick={onClick}
        >
            <Icon
                size={20}
                className={styles.icone}
            />

            <span className={styles.texto}>
                {label}
            </span>
        </button>
    );
}
