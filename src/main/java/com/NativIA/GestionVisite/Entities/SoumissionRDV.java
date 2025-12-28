package com.NativIA.GestionVisite.Entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name="soumissionRDV")
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
    @Column
    private String departement;
    @Column
    private String personneAContacter;
    @Column(nullable=false)
    private String email;
    @Column(nullable=false)
    private String telephone;
    @Column(nullable=false)
    private String entreprise;
    @Column(nullable=false)
    private String motif;
    @Column(nullable=false)
    private LocalDate dateRendezVous;
    @Column(nullable=false)
    private LocalTime heureRendezVous;
    @Column(nullable=false)
    private String statut; // En attente, Approuvée, Rejetée

    // relation avec rendezVous
    @OneToOne
    @JoinColumn(name="rendezVous")
    private RendezVous rendezVous;
    // relation avec visiteur
    @ManyToOne
    private Visiteur visiteur;
}
