package com.NativIA.GestionVisite.Services.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.statistiqueRepository;
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

    @Override
    public statistiqueResponse create(statistiqueRequest request) {
        Statistique s = statistiqueMapper.toEntity(request);
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
            LocalDate p = LocalDate.parse(periode);
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
