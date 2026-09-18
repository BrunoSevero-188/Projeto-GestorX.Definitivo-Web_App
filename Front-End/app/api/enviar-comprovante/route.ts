import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ItemVendaPayload = {
  nome: string;
  codigo: string;
  quantidade: number;
  precoUnitario: number;
};

type PayloadComprovante = {
  itens: ItemVendaPayload[];
  formaPagamento: string;
  total: number;
};

function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function gerarConteudoTxt({ itens, formaPagamento, total }: PayloadComprovante): string {
  const dataHora = new Date().toLocaleString("pt-BR");

  const linhasItens = itens
    .map((item) => {
      const subtotal = formatarPreco(item.precoUnitario * item.quantidade);
      return `${item.quantidade}x  ${item.nome} (${item.codigo})  -  ${subtotal}`;
    })
    .join("\n");

  return [
    "===========================================",
    "        GESTORX - COMPROVANTE DE VENDA",
    "===========================================",
    `Data/Hora: ${dataHora}`,
    "",
    "Itens:",
    linhasItens,
    "",
    `Forma de pagamento: ${formaPagamento}`,
    `TOTAL: ${formatarPreco(total)}`,
    "===========================================",
  ].join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const payload: PayloadComprovante = await request.json();

    if (!payload?.itens?.length || !payload.formaPagamento) {
      return NextResponse.json(
        { erro: "Dados da venda incompletos." },
        { status: 400 }
      );
    }

    const conteudoTxt = gerarConteudoTxt(payload);

    const emailAdm = process.env.ADM_EMAIL;
    if (!emailAdm) {
      return NextResponse.json(
        { erro: "ADM_EMAIL não configurado no servidor." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const agora = new Date();
    const nomeArquivo = `venda-${agora.toISOString().slice(0, 19).replace(/[:T]/g, "-")}.txt`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: emailAdm,
      subject: "Comprovante de Venda - GestorX",
      text: "Segue em anexo o comprovante da venda realizada. Arquivo também gerado em .txt.",
      attachments: [
        {
          filename: nomeArquivo,
          content: conteudoTxt,
        },
      ],
    });

    return NextResponse.json({ sucesso: true });
  } catch (erro) {
    console.error("Erro ao enviar comprovante:", erro);
    return NextResponse.json(
      { erro: "Não foi possível enviar o comprovante por e-mail." },
      { status: 500 }
    );
  }
}
