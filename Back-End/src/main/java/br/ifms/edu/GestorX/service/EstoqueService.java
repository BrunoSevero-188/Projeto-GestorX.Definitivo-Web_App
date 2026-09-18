package br.ifms.edu.GestorX.service;

import java.util.List;
import org.springframework.stereotype.Service;
import br.ifms.edu.GestorX.model.Estoque;

@Service
public interface EstoqueService {

     Estoque salvar(Estoque estoque);

    List<Estoque> listar();

    
}
