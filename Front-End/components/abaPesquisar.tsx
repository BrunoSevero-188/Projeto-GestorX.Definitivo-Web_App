import { Search } from "lucide-react";
import styles from "@/ConjuntosCss/ComponentesCss/AbaPesquisar.module.css";

interface AbaPesquisarProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function AbaPesquisar({ query, setQuery }: AbaPesquisarProps) {
  return (
    <div className={styles.containerDiv}>
      <Search className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Pesquisar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.inputPesquisar}
      />
    </div>
  );
}
