package com.NativIA.GestionVisite.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // ou JOINED, selon ton besoin
@DiscriminatorColumn(name = "type_users") // colonne qui identifiera le type
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class User implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long idUser;

    private String name;

    private String email;
    
    @Column(unique = true)
    private String password;

/*
    @Column(nullable=false)
    private Roles role; // ADMIN,VISITEUR,AGENT_SECURITE,SECRETAIRE,EMPLOYEUR 
    // pour SECRETAIRE
    private String departement;
    // pour Visiteur
    private String entreprise;
    private String ScanDoc;
    // pour AgentSecurite
    private String matricule;
    // pour Admin
    private String privileges;
    // pour Employeur
    private String secteurActivite;
*/

} 
