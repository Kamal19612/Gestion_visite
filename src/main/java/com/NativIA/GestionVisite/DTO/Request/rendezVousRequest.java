package com.NativIA.GestionVisite.DTO.Request;

import jakarta.validation.constraints.NotBlank;
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
public class rendezVousRequest {

    @NotBlank(message = "La date est requise")
    private String date;

    @NotBlank(message = "L'heure est requise")
    private String heure;

    private String type;
    private String statut;
    private String code;

}
