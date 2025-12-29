package com.NativIA.GestionVisite.Entities;


import java.time.LocalDate;
import java.time.LocalTime;

import com.NativIA.GestionVisite.Enum.TypeRDV;
import com.NativIA.GestionVisite.Enum.TypeStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name="rendez_vous")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class RendezVous implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long idRDV;
    
    @Column(name = "rdv_date", nullable=false)
    private LocalDate date;

    @Column(name = "rdv_heure", nullable=false)
    private LocalTime heure;

    @Column(name = "motif", nullable=false)
    private String motif;

    @Column(name = "personne_a_rencontrer", nullable = false)
    private String personneARencontrer;

    @Column(name = "departement", nullable = false)
    private String departement;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_rdv")
    private TypeRDV type;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(255) default 'EN_ATTENTE'")
    private TypeStatus statut;

    @Column(unique = true)
    private String code;

    // relation avec statistique
    @ManyToOne
    private Statistique statistique;
    // relation avec secretaire
    @ManyToOne
    private Secretaire secretaire;
    // relation avec soumissionRDV
    @OneToOne(mappedBy = "rendezVous", cascade=jakarta.persistence.CascadeType.ALL, fetch=jakarta.persistence.FetchType.LAZY)
    private SoumissionRDV soumissionRDV;

    // relation avec visite
    @ManyToOne
    private Visite visite;

    @ManyToOne
    @jakarta.persistence.JoinColumn(name = "visiteur_id")
    private com.NativIA.GestionVisite.Entities.User visiteur;

}
