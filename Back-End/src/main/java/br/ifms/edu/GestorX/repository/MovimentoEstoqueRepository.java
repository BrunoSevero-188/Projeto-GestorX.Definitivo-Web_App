package br.ifms.edu.GestorX.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.ifms.edu.GestorX.model.MovimentoEstoque;

//Faz accessi ao banco automaticamente, sem precisar de implementação
@Repository
public interface MovimentoEstoqueRepository extends JpaRepository<MovimentoEstoque, Long> {

}
