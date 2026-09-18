package br.ifms.edu.GestorX.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import br.ifms.edu.GestorX.model.Estoque;
import br.ifms.edu.GestorX.service.EstoqueService;


@RestController
@RequestMapping("/estoques")
public class EstoqueController {

     private final EstoqueService service;

    public EstoqueController(EstoqueService service) {
        this.service = service;
    }

    @PostMapping
    public Estoque salvar(@RequestBody Estoque estoque) {
        return service.salvar(estoque);
    }

    @GetMapping
    public List<Estoque> listar() {
        return service.listar();
    }
}
