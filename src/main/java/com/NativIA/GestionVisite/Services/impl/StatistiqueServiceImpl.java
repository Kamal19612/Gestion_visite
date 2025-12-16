package com.NativIA.GestionVisite.Services.impl;

import com.NativIA.GestionVisite.DAO.statistiqueRepository;
import com.NativIA.GestionVisite.DAO.visiteRepository;
import com.NativIA.GestionVisite.DTO.Request.statistiqueRequest;
import com.NativIA.GestionVisite.DTO.Response.StatsByDepartementResponse;
import com.NativIA.GestionVisite.DTO.Response.StatsByEmployeResponse;
import com.NativIA.GestionVisite.DTO.Response.statistiqueResponse;
import com.NativIA.GestionVisite.Entities.Statistique;
import com.NativIA.GestionVisite.Entities.Visite;
import com.NativIA.GestionVisite.Services.statistiqueService;
import com.NativIA.GestionVisite.mapper.StatistiqueMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatistiqueServiceImpl implements statistiqueService {

    private final visiteRepository visiteRepository;
    private final statistiqueRepository statistiqueRepository;
    private final StatistiqueMapper mapper;

    public StatistiqueServiceImpl(visiteRepository visiteRepository,
                                    statistiqueRepository statistiqueRepository,
                                    StatistiqueMapper mapper) {
        this.visiteRepository = visiteRepository;
        this.statistiqueRepository = statistiqueRepository;
        this.mapper = mapper;
    }

    @Override
    public statistiqueResponse create(statistiqueRequest request) {
        Statistique s = mapper.toEntity(request);
        return mapper.toResponse(statistiqueRepository.save(s));
    }

    @Override
    public statistiqueResponse getById(Long id) {
        return statistiqueRepository.findById(id).map(mapper::toResponse).orElse(null);
    }

    @Override
    public List<statistiqueResponse> getAll() {
        return statistiqueRepository.findAll().stream().map(mapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        statistiqueRepository.deleteById(id);
    }

    @Override
    public List<statistiqueResponse> getStatsByPeriode(LocalDate from, LocalDate to) {
        List<Visite> visites = visiteRepository.findByDateBetween(from.atStartOfDay(), to.plusDays(1).atStartOfDay());
        Map<LocalDate, Long> visitsByDate = visites.stream()
                .collect(Collectors.groupingBy(v -> v.getDate().toLocalDate(), Collectors.counting()));
        List<Statistique> stats = visitsByDate.entrySet().stream()
                .map(entry -> Statistique.builder()
                        .periode(entry.getKey())
                        .nombreVisites(entry.getValue().intValue())
                        .nombreRDV(0)
                        .nombreSoumissions(0)
                        .dureeMoyenneMinutes(null)
                        .build())
                .collect(Collectors.toList());
        List<Statistique> savedStats = stats.stream()
                .map(statistiqueRepository::save)
                .collect(Collectors.toList());
        return savedStats.stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<StatsByDepartementResponse> getStatsByDepartement() {
        return visiteRepository.findAll().stream()
                .filter(v -> v.getEmploye() != null && v.getEmploye().getSecteurActivite() != null)
                .collect(Collectors.groupingBy(v -> v.getEmploye().getSecteurActivite(), Collectors.counting()))
                .entrySet().stream()
                .map(entry -> new StatsByDepartementResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    @Override
    public List<StatsByEmployeResponse> getStatsByEmploye() {
        return visiteRepository.findAll().stream()
                .filter(v -> v.getEmploye() != null && v.getEmploye().getName() != null)
                .collect(Collectors.groupingBy(v -> v.getEmploye().getName(), Collectors.counting()))
                .entrySet().stream()
                // A better key would be employee ID, but name is used for simplicity here.
                .map(entry -> new StatsByEmployeResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}