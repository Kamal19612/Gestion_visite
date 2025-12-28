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

    @NotBlank(message = "Le motif du rendez-vous est requis")
    private String motif;

    @NotBlank(message = "La personne à rencontrer est requise")
    private String personneARencontrer;

    @NotBlank(message = "Le département est requis")
    private String departement;

    private String type;
    private String statut;
    private String code;

    // Champs optionnels pour permettre à un agent de créer un rendez-vous pour un visiteur
    // Si ces champs sont fournis, le système créera/trouvera le visiteur correspondant
    private String visiteurEmail; // Email du visiteur (pour agent créant un RDV pour un visiteur)
    private String visiteurFirstName; // Prénom du visiteur (si création nécessaire)
    private String visiteurLastName; // Nom du visiteur (si création nécessaire)
    private String visiteurWhatsapp; // WhatsApp du visiteur (optionnel)

}
