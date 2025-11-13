package com.NativIA.GestionVisite.Entities;

import java.sql.Date;
import java.sql.Time;

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
@Table(name="SoumissionRDV")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class SoumissionRDV implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idSoumission;
    @Column(nullable=false)
    private String nom;
    @Column(nullable=false)
    private String prenom;
    @Column(nullable=false)
    private String departement;
    @Column(nullable=false)
    private String email;
    @Column(nullable=false)
    private String telephone;
    @Column(nullable=false)
    private String entreprise;
    @Column(nullable=false)
    private String motif;
    @Column(nullable=false)
    private Date dateRendezVous;
    @Column(nullable=false)
    private Time heureRendezVous;
    @Column(nullable=false)
    private String statut; // En attente, Approuvée, Rejetée

}
