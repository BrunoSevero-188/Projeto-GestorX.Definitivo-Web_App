package br.ifms.edu.GestorX.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelatorioVendaRequestDTO {

    private LocalDate dataInicio;
    private LocalDate dataFim;

}