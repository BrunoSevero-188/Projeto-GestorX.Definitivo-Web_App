package br.ifms.edu.GestorX.service;

import br.ifms.edu.GestorX.dto.RelatorioVendaRequestDTO;
import br.ifms.edu.GestorX.dto.RelatorioVendaResponseDTO;
import br.ifms.edu.GestorX.exception.RegraNegocioException;


public interface RelatorioVendaService {
    
     RelatorioVendaResponseDTO gerarRelatorio(RelatorioVendaRequestDTO request);

}
