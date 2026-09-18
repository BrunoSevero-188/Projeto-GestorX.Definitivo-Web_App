package br.ifms.edu.GestorX.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import br.ifms.edu.GestorX.model.Estoque;
import br.ifms.edu.GestorX.repository.EstoqueRepository;
import br.ifms.edu.GestorX.service.EstoqueService;

@Service
public class EstoqueServiceImpl implements EstoqueService {

    private final EstoqueRepository repository;

    public EstoqueServiceImpl(EstoqueRepository repository) {
        this.repository = repository;
    }

    public Estoque salvar(Estoque estoque) {
        estoque.atualizarStatus();
        return repository.save(estoque);
    }

    public List<Estoque> listar() {
        return repository.findAll();
    }
}
