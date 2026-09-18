"use client";

import { useState } from "react";
import Link from "next/link";
import styleLinkInfo from "@/ConjuntosCss/ComponentesCss/LinksInfo.module.css";

type LinkInfoProps =
  | { modo: "link"; text: string; href: string }
  | { modo: "icone"; icon: string; text: string };

export default function LinkInfo(props: LinkInfoProps) {
  const [aberto, setAberto] = useState(false);

  if (props.modo === "link") {
    return (
      <Link href={props.href} className={styleLinkInfo.containerLinks}>
        {props.text}
      </Link>
    );
  }

  return (
    <div className={styleLinkInfo.containerInfos}>
      <button
        className={styleLinkInfo.icone}
        onClick={() => setAberto((prev) => !prev)}
        aria-expanded={aberto}
        type="button"
      >
        {props.icon}
      </button>
      <span className={`${styleLinkInfo.texto} ${aberto ? styleLinkInfo.textoVisivel : ""}`}>
        {props.text}
      </span>
    </div>
  );
}