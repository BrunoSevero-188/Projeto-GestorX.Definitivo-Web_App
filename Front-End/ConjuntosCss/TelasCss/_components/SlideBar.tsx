"use client";

import {
    Home,
    Package,
    Truck,
    ArrowDownToLine,
    ArrowUpFromLine,
    ShoppingCart,
    Users,
    FileText,
    Settings,
} from "lucide-react";

import { useRouter } from "next/navigation";
import IconButton from "./IconButton";
import styles from "../_styles/SlideBar.module.css";

export default function SlideBar() {

    const router = useRouter();

    return (
        <aside className={styles.slideBar}>

            <div className={styles.logo}>
                <h1>GestorXpress</h1>
            </div>

            <nav className={styles.navegacao}>

                <IconButton
                    icon={Home}
                    label="Início"
                    onClick={() => router.push("/telas/TelasInternas/slideBar/Inicio")}
                />

                <IconButton
                    icon={Package}
                    label="Produtos"
                    onClick={() => router.push("/telas/TelasInternas/slideBar/Estoque/Produtos")}
                />

                <IconButton
                    icon={Truck}
                    label="Fornecedores"
                    onClick={() => router.push("/telas/TelasInternas/slideBar/Estoque/Fornecedores")}
                />

                <IconButton
                    icon={ArrowDownToLine}
                    label="Entrada"
                    onClick={() => router.push("/telas/TelasInternas/slideBar/Estoque/Entrada")}
                />

                <IconButton
                    icon={ArrowUpFromLine}
                    label="Saída"
                    onClick={() => router.push("/telas/TelasInternas/slideBar/Estoque/Saida")}
                />

                <IconButton
                    icon={ShoppingCart}
                    label="Vendas"
                    onClick={() => router.push("/telas/TelasInternas/slideBar/Vendas")}
                />

                <IconButton
                    icon={Users}
                    label="Usuários"
                    onClick={() => router.push("/telas/TelasInternas/slideBar/Usuarios")}
                />

                <IconButton
                    icon={FileText}
                    label="Relatórios"
                    onClick={() => router.push("/telas/TelasInternas/slideBar/Relatorios")}
                />

                <IconButton
                    icon={Settings}
                    label="Configurações"
                    onClick={() => router.push("/telas/TelasInternas/slideBar/Configuracoes")}
                />

            </nav>

        </aside>
    );
}