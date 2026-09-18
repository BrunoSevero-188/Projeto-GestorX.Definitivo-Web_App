package br.ifms.edu.GestorX.service;

import java.util.List;
import org.springframework.stereotype.Service;
import br.ifms.edu.GestorX.dto.ProdutoDTO;
import br.ifms.edu.GestorX.model.Produto;

@Service
public interface ProdutoService {
    ProdutoDTO salvar(Produto produto);

    List<ProdutoDTO> listar();
    
    
    ProdutoDTO buscarPorId(Long id);

    void deletar (Long id);

    ProdutoDTO atualizar(Long id, Produto produto); 
}
