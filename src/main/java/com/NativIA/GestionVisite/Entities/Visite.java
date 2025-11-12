package com.NativIA.GestionVisite.Entities;

import java.io.Serializable;
import java.sql.Time;
import java.time.LocalDateTime;

import com.NativIA.GestionVisite.Enum.typeStatus;

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
    private Time HSortie;
    @Column(nullable=false)
    private String motif;
    @Column(nullable=false)
    private typeStatus Statut;

}
