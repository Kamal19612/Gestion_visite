package com.NativIA.GestionVisite.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class rendezVousResponse {
    private Long id;
    private String date;
    private String heure;
    private String type;
    private Boolean statut;
    private String code;
    private Long visiteId;
    private Long statistiqueId;
    private Long secretaireId;
    private Long soumissionRDVId;
}
