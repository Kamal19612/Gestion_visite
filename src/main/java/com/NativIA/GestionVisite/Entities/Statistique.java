package com.NativIA.GestionVisite.Entities;

import java.time.format.DateTimeFormatterBuilder;

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
@Table(name= "Statistiques")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Statistique implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @Column(nullable=false)
    private DateTimeFormatterBuilder periode;

}
