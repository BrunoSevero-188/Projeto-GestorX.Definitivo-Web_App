package br.ifms.edu.GestorX.service;

import java.util.List;
import br.ifms.edu.GestorX.dto.MovimentoEstoqueRequestDTO;
import br.ifms.edu.GestorX.dto.MovimentoEstoqueResponseDTO;

// Define o contrato do serviço
public interface MovimentoEstoqueService {

    // Realiza entrada, saída ou ajuste
    MovimentoEstoqueResponseDTO realizarMovimento(MovimentoEstoqueRequestDTO dto);

    // Lista todos os movimentos
    List<MovimentoEstoqueResponseDTO> listar();
}