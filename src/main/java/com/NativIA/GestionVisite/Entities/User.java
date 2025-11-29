package com.NativIA.GestionVisite.Entities;

import java.time.Instant;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
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
@EntityListeners(AuditingEntityListener.class)
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

    @Column(unique = true)
    private String email;
    
    private String password;

    // Audit fields (populated by Spring Data JPA auditing)
    @CreatedDate
    @Column(name = "created_date", updatable = false)
    private Instant createdDate;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;

    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy;

    @LastModifiedBy
    @Column(name = "last_modified_by")
    private String lastModifiedBy;

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
