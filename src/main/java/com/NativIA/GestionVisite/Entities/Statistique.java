package com.NativIA.GestionVisite.Entities;


import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name= "Statistiques")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Statistique implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false)
    private Date periode;
    @Column(nullable=false)
    private int nombreVisites;
    @Column(nullable=false)
    private int nombreRDV;
    @Column(nullable=false)
    private int nombreSoumissions;

    // relation avec visite
    @OneToMany(mappedBy = "statistique", cascade=jakarta.persistence.CascadeType.ALL, fetch=jakarta.persistence.FetchType.LAZY)
    private List<Visite> visites;
    // relation avec rendezVous
    @OneToMany(mappedBy = "statistique", cascade=jakarta.persistence.CascadeType.ALL, fetch=jakarta.persistence.FetchType.LAZY)
    private List<RendezVous> rendezVouss;
    // relation avec admin
    @OneToMany(mappedBy = "statistique", cascade=jakarta.persistence.CascadeType.ALL, fetch=jakarta.persistence.FetchType.LAZY)
    private List<Admin> admins;

}
