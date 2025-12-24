package com.NativIA.GestionVisite.Services.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.rendezVousRepository;
import com.NativIA.GestionVisite.DTO.Request.rendezVousRequest;
import com.NativIA.GestionVisite.DTO.Response.rendezVousResponse;
import com.NativIA.GestionVisite.Entities.RendezVous;
import com.NativIA.GestionVisite.Services.rendezVousService;
import com.NativIA.GestionVisite.mapper.RendezVousMapper;

@Service
@Transactional
public class RendezVousServiceImpl implements rendezVousService {

    @Autowired
    private rendezVousRepository rendezVousRepository;

    @Autowired
    private RendezVousMapper rendezVousMapper;

    @Autowired
    private com.NativIA.GestionVisite.Services.ConflictDetectionService conflictDetectionService;

    @Override
    public rendezVousResponse create(rendezVousRequest request) {
        // check for conflicts before creating
        LocalDate date = LocalDate.parse(request.getDate());
        LocalTime heure = LocalTime.parse(request.getHeure());
        if (conflictDetectionService.hasConflict(date, heure)) {
            throw new IllegalStateException("Conflit de rendez-vous: créneau déjà réservé");
        }
        RendezVous r = rendezVousMapper.toEntity(request);
        return rendezVousMapper.toResponse(rendezVousRepository.save(r));
    }

    @Override
    public rendezVousResponse getById(Long id) {
        return rendezVousRepository.findById(id).map(rendezVousMapper::toResponse).orElse(null);
    }

    @Override
    public List<rendezVousResponse> getAll() {
        return rendezVousRepository.findAll().stream().map(rendezVousMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<rendezVousResponse> findByDate(String date) {
        try {
            LocalDate d = LocalDate.parse(date);
            return rendezVousRepository.findByDate(d).stream().map(rendezVousMapper::toResponse).collect(Collectors.toList());
        } catch (Exception e) {
            return List.of();
        }
    }

    @Override
    public List<rendezVousResponse> findByVisiteurEmail(String email) {
        try {
            return rendezVousRepository.findByVisiteur_Email(email).stream().map(rendezVousMapper::toResponse).collect(Collectors.toList());
        } catch (Exception e) {
            return List.of();
        }
    }

    @Override
    public void delete(Long id) {
        rendezVousRepository.deleteById(id);
    }

}
