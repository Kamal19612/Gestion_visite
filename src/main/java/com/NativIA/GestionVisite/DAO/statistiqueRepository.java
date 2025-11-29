package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.Statistique;

@Repository
public interface statistiqueRepository extends JpaRepository<Statistique, Long> {

	java.util.Optional<Statistique> findByPeriode(java.time.LocalDate periode);

}
