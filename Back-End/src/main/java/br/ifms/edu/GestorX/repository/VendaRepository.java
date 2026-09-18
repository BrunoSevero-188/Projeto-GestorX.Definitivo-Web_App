package br.ifms.edu.GestorX.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.ifms.edu.GestorX.model.Venda;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long>{

    List<Venda> findByDataVendaBetween(LocalDate inicio, LocalDate fim);
}
