package com.NativIA.GestionVisite.Entities;

import com.NativIA.GestionVisite.Enum.Roles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class User implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long idUser;
    @Column(nullable=false)
    private String name;
    @Column(nullable=false)
    private String email;
    @Column(unique = true)
    private String password;
    @Column(nullable=false)
    private Roles role;

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


} 
