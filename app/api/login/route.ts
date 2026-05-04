import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  // Buscar usuário pelo e-mail
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 400 }
    );
  }

  // Validar senha
  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    return NextResponse.json(
      { error: "Senha incorreta" },
      { status: 400 }
    );
  }

  return NextResponse.json(usuario);
}