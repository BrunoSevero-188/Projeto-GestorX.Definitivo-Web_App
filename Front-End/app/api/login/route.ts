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

  const senhaCorreta = usuario
    ? await bcrypt.compare(senha, usuario.senha)
    : false;

  if (!usuario || !senhaCorreta) {
    return NextResponse.json(
      { error: "E-mail ou senha incorretos." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    cargo: usuario.cargo,
    estabelecimento: usuario.estabelecimento,
  });}