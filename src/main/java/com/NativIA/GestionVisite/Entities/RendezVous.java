package com.NativIA.GestionVisite.Entities;


import java.time.LocalDate;
import java.time.LocalTime;

import com.NativIA.GestionVisite.Enum.TypeRDV;

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
@Table(name="rendezVous")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class RendezVous implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long idRDV;
    
    @Column(nullable=false)
    private LocalDate date;

    @Column(nullable=false)
    private LocalTime heure;

    @Enumerated(EnumType.STRING)
    private TypeRDV type;

    private Boolean statut;

    @Column(unique = true)
    private String code;

    // relation avec visite
    @ManyToOne
    private Visite visite;
    // relation avec statistique
    @ManyToOne
    private Statistique statistique;
    // relation avec secretaire
    @ManyToOne
    private Secretaire secretaire;
    // relation avec soumissionRDV
    @OneToOne(mappedBy = "rendezVous", cascade=jakarta.persistence.CascadeType.ALL, fetch=jakarta.persistence.FetchType.LAZY)
    private SoumissionRDV soumissionRDV;

}
