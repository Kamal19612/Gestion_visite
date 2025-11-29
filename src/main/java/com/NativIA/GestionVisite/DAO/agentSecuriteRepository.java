package com.NativIA.GestionVisite.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NativIA.GestionVisite.Entities.AgentSecurite;

@Repository
public interface agentSecuriteRepository extends JpaRepository<AgentSecurite, Long> {

}
