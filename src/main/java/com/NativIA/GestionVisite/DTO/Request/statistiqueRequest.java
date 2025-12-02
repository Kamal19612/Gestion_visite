package com.NativIA.GestionVisite.DTO.Request;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.Min;
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
public class statistiqueRequest {

    @NotBlank(message = "La période est requise")
    private String periode;

    @Min(value = 0, message = "Le nombre de visites doit être positif")
    private int nombreVisites;

    @Min(value = 0, message = "Le nombre de RDV doit être positif")
    private int nombreRDV;

    @Min(value = 0, message = "Le nombre de soumissions doit être positif")
    private int nombreSoumissions;

    // Optionnel: la durée moyenne peut être calculée côté serveur; le client peut la laisser vide
    private Double dureeMoyenneMinutes;

}
