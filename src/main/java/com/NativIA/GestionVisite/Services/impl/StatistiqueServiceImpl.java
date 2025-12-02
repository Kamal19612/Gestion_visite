package com.NativIA.GestionVisite.Services.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.statistiqueRepository;
import com.NativIA.GestionVisite.DAO.visiteRepository;
import com.NativIA.GestionVisite.DTO.Request.statistiqueRequest;
import com.NativIA.GestionVisite.DTO.Response.statistiqueResponse;
import com.NativIA.GestionVisite.Entities.Statistique;
import com.NativIA.GestionVisite.Services.statistiqueService;
import com.NativIA.GestionVisite.mapper.StatistiqueMapper;

@Service
@Transactional
public class StatistiqueServiceImpl implements statistiqueService {

    @Autowired
    private statistiqueRepository statistiqueRepository;

    @Autowired
    private StatistiqueMapper statistiqueMapper;

    @Autowired
    private visiteRepository visiteRepository;

    @Override
    public statistiqueResponse create(statistiqueRequest request) {
        Statistique s = statistiqueMapper.toEntity(request);
        // Calculer la durée moyenne pour la période si possible
        try {
            if (request.getPeriode() != null) {
                java.time.LocalDate periode = java.time.LocalDate.parse(request.getPeriode());
                java.time.LocalDateTime start = periode.atStartOfDay();
                java.time.LocalDateTime end = start.plusDays(1);
                java.util.List<com.NativIA.GestionVisite.Entities.Visite> visites = visiteRepository.findByDateBetween(start, end);
                // calculer les durées en minutes pour les visites qui ont HEntree et HSortie
                double avg = visites.stream()
                        .filter(v -> v.getHEntree() != null && v.getHSortie() != null)
                        .mapToLong(v -> java.time.Duration.between(v.getHEntree(), v.getHSortie()).toMinutes())
                        .average()
                        .orElse(0.0);
                s.setDureeMoyenneMinutes(avg);
            }
        } catch (Exception e) {
            // ignore parsing errors; dureeMoyenne restera nulle
        }
        return statistiqueMapper.toResponse(statistiqueRepository.save(s));
    }

    @Override
    public statistiqueResponse getById(Long id) {
        return statistiqueRepository.findById(id).map(statistiqueMapper::toResponse).orElse(null);
    }

    @Override
    public List<statistiqueResponse> getAll() {
        return statistiqueRepository.findAll().stream().map(statistiqueMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public statistiqueResponse findByPeriode(String periode) {
        try {
            java.time.format.DateTimeFormatter fmt = java.time.format.DateTimeFormatter.ofPattern("dd-MM-yyyy");
            LocalDate p = LocalDate.parse(periode, fmt);
            return statistiqueRepository.findByPeriode(p).map(statistiqueMapper::toResponse).orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public void delete(Long id) {
        statistiqueRepository.deleteById(id);
    }

}
