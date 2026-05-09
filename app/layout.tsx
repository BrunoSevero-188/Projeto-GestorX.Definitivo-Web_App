import type { Metadata } from "next";
import "./globals.css";


import styles from "@/ConjuntosCss/TelasCss/Layout.module.css";

export const metadata: Metadata = {
  title: "GESTORX",
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
  description: "Sistema de gestão de estoque e usuários",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={styles.containerBody}>
        <div className={styles.containerChildren}>
          {children}
        </div>
      </body>
    </html>
  );
}
