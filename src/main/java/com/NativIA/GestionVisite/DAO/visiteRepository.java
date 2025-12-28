package com.NativIA.GestionVisite.DAO;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Visite;
import com.NativIA.GestionVisite.Enum.TypeStatus;

@Repository
public interface visiteRepository extends JpaRepository<Visite, Long> {

	java.util.List<Visite> findByStatut(TypeStatus statut);

	java.util.List<Visite> findByEmploye_Id(Long employeId);

	java.util.List<Visite> findByDateBetween(LocalDateTime start, LocalDateTime end);

}
