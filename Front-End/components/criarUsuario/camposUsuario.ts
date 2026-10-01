export type TipoConta = "administrador" | "funcionario";

export type NomeCampo =
  | "nome"
  | "cpf"
  | "email"
  | "senha"
  | "cargo"
  | "telefone"
  | "estabelecimento"
  | "dataAdmissao"
  | "nomeEmpresa"
  | "cnpj"
  | "departamento"
  | "nivelPermissao";

export interface CampoUsuario {
  name: NomeCampo;
  label: string;
  type?: "text" | "email" | "password" | "date";
  obrigatorio?: boolean; // padrão: true
}

const camposBasicos: CampoUsuario[] = [
  { name: "nome", label: "Nome Completo" },
  { name: "cpf", label: "CPF" },
  { name: "email", label: "E-mail", type: "email" },
  { name: "senha", label: "Senha", type: "password" },
  { name: "cargo", label: "Cargo" },
  { name: "telefone", label: "Telefone" },
];

const camposFuncionario: CampoUsuario[] = [
  { name: "estabelecimento", label: "Estabelecimento" },
  {
    name: "dataAdmissao",
    label: "Data de Admissao",
    type: "date",
    obrigatorio: false,
  },
];

/* Administrador: 6 básicos + 4 = 10 campos (grade 2x5 no desktop) */
const camposAdministrador: CampoUsuario[] = [
  { name: "nomeEmpresa", label: "Nome da Empresa" },
  { name: "cnpj", label: "CNPJ" },
  { name: "departamento", label: "Departamento", obrigatorio: false },
  { name: "nivelPermissao", label: "Nivel de Permissao" },
];

export const camposPorTipo: Record<TipoConta, CampoUsuario[]> = {
  funcionario: [...camposBasicos, ...camposFuncionario],
  administrador: [...camposBasicos, ...camposAdministrador],
};

export const tituloPorTipo: Record<TipoConta, string> = {
  administrador: "Criar Usuario (Administrador)",
  funcionario: "Criar Usuario (Funcionario)",
};

export const rotaCriarUsuario = "/telas/TelasCadastro/CriarUsuario";