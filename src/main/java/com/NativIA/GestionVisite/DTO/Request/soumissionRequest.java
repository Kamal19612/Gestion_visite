package com.NativIA.GestionVisite.DTO.Request;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.Email;
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
public class soumissionRequest {

    @NotBlank(message = "Le nom est requis")
    private String nom;

    @NotBlank(message = "Le prénom est requis")
    private String prenom;

    @NotBlank(message = "Le département est requis")
    private String departement;

    @NotBlank(message = "L'email est requis")
    @Email(message = "Email invalide")
    private String email;

    @NotBlank(message = "Le téléphone est requis")
    private String telephone;

    @NotBlank(message = "L'entreprise est requise")
    private String entreprise;

    @NotBlank(message = "Le motif est requis")
    private String motif;

    @NotBlank(message = "La date du rendez-vous est requise")
    private String dateRendezVous;

    @NotBlank(message = "L'heure du rendez-vous est requise")
    private String heureRendezVous;


}
