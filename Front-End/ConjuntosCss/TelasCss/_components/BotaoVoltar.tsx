"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import styles from "../_styles/Botoes.module.css";

export default function BotaoVoltar() {

    const router = useRouter();

    return (
        <button
            className={styles.botaoVoltar}
            onClick={() => router.back()}
        >
            <ArrowLeft size={18} />

            <span>
                Voltar
            </span>
        </button>
    );
}