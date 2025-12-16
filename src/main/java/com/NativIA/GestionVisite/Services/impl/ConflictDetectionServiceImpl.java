package com.NativIA.GestionVisite.Services.impl;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NativIA.GestionVisite.DAO.rendezVousRepository;
import com.NativIA.GestionVisite.Services.ConflictDetectionService;

@Service
public class ConflictDetectionServiceImpl implements ConflictDetectionService {

    @Autowired
    private rendezVousRepository rendezVousRepository;

    @Override
    public boolean hasConflict(LocalDate date, LocalTime heure) {
        var list = rendezVousRepository.findByDateAndHeure(date, heure);
        return list != null && !list.isEmpty();
    }
}
