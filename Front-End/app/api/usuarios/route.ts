import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type CriarUsuarioBody = {
  nome?: string;
  cpf?: string;
  email?: string;
  senha?: string;
  cargo?: string;
  estabelecimento?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as CriarUsuarioBody;
  const { nome, cpf, email, senha, cargo, estabelecimento } = body;

  if (!nome || !cpf || !email || !senha || !cargo || !estabelecimento) {
    return NextResponse.json(
      { error: "Preencha todos os campos obrigatorios." },
      { status: 400 }
    );
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  try {
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        cpf,
        email,
        senha: senhaCriptografada,
        cargo,
        estabelecimento,
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
        cargo: true,
        estabelecimento: true,
        createdAt: true,
      },
    });

    return NextResponse.json(usuario, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Nao foi possivel criar o usuario. Verifique CPF e e-mail." },
      { status: 409 }
    );
  }
}
