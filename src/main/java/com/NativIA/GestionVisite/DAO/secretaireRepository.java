package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Secretaire;

@Repository
public interface secretaireRepository extends JpaRepository<Secretaire, Long> {

	java.util.List<Secretaire> findByDepartement(String departement);

}
