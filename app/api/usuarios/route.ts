import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Cadastro de usuarios ainda nao configurado no servidor." },
    { status: 501 }
  );
}
