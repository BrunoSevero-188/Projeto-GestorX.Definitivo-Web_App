import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type LoginBody = {
  email?: string;
  senha?: string;
};

export async function POST(req: Request) {
  const { email, senha } = (await req.json()) as LoginBody;

  if (!email || !senha) {
    return NextResponse.json(
      { error: "Informe e-mail e senha." },
      { status: 400 }
    );
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    return NextResponse.json(
      { error: "Usuario nao encontrado." },
      { status: 404 }
    );
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    return NextResponse.json(
      { error: "Senha incorreta." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    id: usuario.id,
    nome: usuario.nome,
    cpf: usuario.cpf,
    email: usuario.email,
    cargo: usuario.cargo,
    estabelecimento: usuario.estabelecimento,
  });
}
