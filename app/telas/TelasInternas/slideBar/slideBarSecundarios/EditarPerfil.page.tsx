"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { dadosUsuario } from "@/components/dadosUsuario";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function EditarPerfil() {
  const router = useRouter();

  const [usuario, setUsuario] = useState(dadosUsuario[0]);

  useEffect(() => {
    const aleatorio = Math.floor(Math.random() * dadosUsuario.length);
    setUsuario(dadosUsuario[aleatorio]);
  }, []);

  function atualizar(campo: string, valor: string) {
    setUsuario({ ...usuario, [campo]: valor });
  }

  function salvar() {
    alert("Dados atualizados com sucesso!");
    router.push("/telas/slideBar/Perfil/AcessarPerfil");
  }

  return (
    <main className={styleSlideBar.paginaPrincipalCentralizada}>
      <div className={styleSlideBar.paginaCartaoFormulario}>
        <h1 className={styleSlideBar.paginaTituloEscuro}>Editar Perfil</h1>

        <div className={styleSlideBar.formularioGrid}>
          <Input label="Nome Completo" value={usuario.nomeCompleto}
            onChange={(e) => atualizar("nomeCompleto", e.target.value)} />

          <Input label="Nome do Perfil" value={usuario.nomePerfil}
            onChange={(e) => atualizar("nomePerfil", e.target.value)} />

          <Input label="CPF" value={usuario.cpf}
            onChange={(e) => atualizar("cpf", e.target.value)} />

          <Input label="E-mail" value={usuario.email}
            onChange={(e) => atualizar("email", e.target.value)} />

          <Input label="Cargo" value={usuario.cargo}
            onChange={(e) => atualizar("cargo", e.target.value)} />

          <Input label="Estabelecimento" value={usuario.estabelecimento}
            onChange={(e) => atualizar("estabelecimento", e.target.value)} />
        </div>

        <Button onClick={salvar}>Salvar Alteracoes</Button>
      </div>
    </main>
  );
}