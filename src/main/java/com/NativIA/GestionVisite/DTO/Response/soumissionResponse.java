package com.NativIA.GestionVisite.DTO.Response;

import org.springframework.stereotype.Component;

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
public class soumissionResponse {

    private String nom;
    private String prenom;
    private String departement;
    private String email;
    private String telephone;
    private String entreprise;
    private String motif;
    private String dateRendezVous;
    private String heureRendezVous;
    private String statut;


}
