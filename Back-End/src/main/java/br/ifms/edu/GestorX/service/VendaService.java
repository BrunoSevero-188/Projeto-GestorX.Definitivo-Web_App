package br.ifms.edu.GestorX.service;

import java.util.List;
import br.ifms.edu.GestorX.dto.VendaRequestDTO;
import br.ifms.edu.GestorX.dto.VendaResponseDTO;

public interface VendaService {

    // Realiza venda com regra de negócio
    VendaResponseDTO realizarVenda(VendaRequestDTO dto);

    // Lista vendas
    List<VendaResponseDTO> listar();
}