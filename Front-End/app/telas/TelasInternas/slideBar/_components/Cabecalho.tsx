interface CabecalhoProps {
    titulo: string;
    descricao?: string;
}

export default function Cabecalho({
    titulo,
    descricao
}: CabecalhoProps) {

    return (
        <header>
            <h1>{titulo}</h1>

            {descricao && (
                <p>{descricao}</p>
            )}
        </header>
    );
}