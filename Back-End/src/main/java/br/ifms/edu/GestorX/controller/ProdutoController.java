package br.ifms.edu.GestorX.controller;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.ifms.edu.GestorX.dto.ProdutoDTO;
import br.ifms.edu.GestorX.model.Produto;
import br.ifms.edu.GestorX.service.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    // 🔹 Criar produto
    @PostMapping
    public ProdutoDTO salvar(@RequestBody Produto produto) {
        return service.salvar(produto);
    }

    // 🔹 Criar vários produtos (lote)
    @PostMapping("/lote")
    public List<ProdutoDTO> salvarVarios(@RequestBody List<Produto> produtos) {
        return produtos.stream()
                .map(service::salvar) // retorna DTO
                .toList();
    }

    // 🔹 Listar todos
    @GetMapping
    public List<ProdutoDTO> listar() {
        return service.listar();
    }

    // 🔹 Buscar por ID
    @GetMapping("/{id}")
    public ProdutoDTO buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // 🔹 Atualizar produto
    @PutMapping("/{id}")
    public ProdutoDTO atualizar(@PathVariable Long id, @RequestBody Produto produto) {
        return service.atualizar(id, produto);
    }

    // 🔹 Deletar produto
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
