package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.RendezVous;

@Repository
public interface rendezVousRepository extends JpaRepository<RendezVous, Long> {

	java.util.List<RendezVous> findByDate(java.time.LocalDate date);

	java.util.List<RendezVous> findByDateAndHeure(java.time.LocalDate date, java.time.LocalTime heure);

	java.util.List<RendezVous> findBySecretaire_Id(Long secretaireId);

}
