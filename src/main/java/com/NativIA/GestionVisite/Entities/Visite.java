package com.NativIA.GestionVisite.Entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.NativIA.GestionVisite.Enum.typeStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name="Visites")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Visite implements Serializable{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false)
    private LocalDateTime Date;
    private LocalDateTime HEntree;
    private LocalDateTime HSortie;
    @Column(nullable=false)
    private String motif;
    @Column(nullable=false)
    private typeStatus Statut;

    //relation avec l'entité employe
    @ManyToOne  
    private Employe employe;
    //relation avec l'entité agentSecurite
    @ManyToOne  
    private AgentSecurite agentSecurite;
    // relation avec l'entité notification
    @OneToMany(mappedBy = "visite", cascade=jakarta.persistence.CascadeType.ALL, fetch=jakarta.persistence.FetchType.LAZY)
    private java.util.List<Notification> notifications;
    // relation avec l'entité statistique
    @ManyToOne
    private Statistique statistique;
    // relation avec l'entité rendezVous
    @OneToMany(mappedBy = "visite", cascade=jakarta.persistence.CascadeType.ALL, fetch=jakarta.persistence.FetchType.LAZY)
    private java.util.List<RendezVous> rendezVouss;

}
