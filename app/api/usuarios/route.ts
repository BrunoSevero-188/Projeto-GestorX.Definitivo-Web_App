import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const { nome, cpf, email, senha, cargo, estabelecimento } = body;

  // Criptografar senha
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  // Criar usuário no banco
  const usuario = await prisma.usuario.create({
    data: {
      nome,
      cpf,
      email,
      senha: senhaCriptografada,
      cargo,
      estabelecimento,
    },
  });

  return NextResponse.json(usuario);
}