package com.NativIA.GestionVisite.Services.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NativIA.GestionVisite.DAO.rendezVousRepository;
import com.NativIA.GestionVisite.Entities.RendezVous;
import com.NativIA.GestionVisite.Services.ConflictDetectionService;
import com.NativIA.GestionVisite.Enum.typeStatus;

@Service
public class ConflictDetectionServiceImpl implements ConflictDetectionService {

    @Autowired
    private rendezVousRepository rendezVousRepository;

    @Override
    public boolean hasConflict(LocalDate date, LocalTime heure) {
        // Find appointments at the same date and time
        List<RendezVous> existing = rendezVousRepository.findByDateAndHeure(date, heure);
        if (existing == null || existing.isEmpty()) {
            return false;
        }
        
        // Filter out cancelled or rejected appointments
        // If there is ANY appointment that is NOT Cancelled/Rejected, it's a conflict.
        return existing.stream().anyMatch(rdv -> 
            rdv.getStatut() != typeStatus.ANNULEE && 
            rdv.getStatut() != typeStatus.REJETEE
        );
    }
}
