package com.NativIA.GestionVisite.DTO.Request;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Component
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class visiteRequest {
    
    @NotBlank(message = "La date est requise")
    private String date;

    @NotBlank(message = "L'heure d'entrée est requise")
    private String HEntree;

    private String HSortie;

    @NotBlank(message = "Le motif est requis")
    private String motif;

}
