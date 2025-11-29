package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Visite;

@Repository
public interface visiteRepository extends JpaRepository<Visite, Long> {

	java.util.List<Visite> findByStatut(com.NativIA.GestionVisite.Enum.typeStatus statut);

	java.util.List<Visite> findByEmploye_Id(Long employeId);

}
