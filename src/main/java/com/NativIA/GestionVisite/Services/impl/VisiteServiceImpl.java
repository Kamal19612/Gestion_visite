package com.NativIA.GestionVisite.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.visiteRepository;
import com.NativIA.GestionVisite.DTO.Request.visiteRequest;
import com.NativIA.GestionVisite.DTO.Response.visiteResponse;
import com.NativIA.GestionVisite.Entities.Visite;
import com.NativIA.GestionVisite.Services.visiteService;
import com.NativIA.GestionVisite.mapper.VisiteMapper;

@Service
@Transactional
public class VisiteServiceImpl implements visiteService {

    @Autowired
    private visiteRepository visiteRepository;

    @Autowired
    private VisiteMapper visiteMapper;

    @Override
    public visiteResponse create(visiteRequest request) {
        Visite v = visiteMapper.toEntity(request);
        return visiteMapper.toResponse(visiteRepository.save(v));
    }

    @Override
    public visiteResponse getById(Long id) {
        return visiteRepository.findById(id).map(visiteMapper::toResponse).orElse(null);
    }

    @Override
    public List<visiteResponse> getAll() {
        return visiteRepository.findAll().stream().map(visiteMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<visiteResponse> findByStatut(String statut) {
        try {
            return visiteRepository.findByStatut(com.NativIA.GestionVisite.Enum.typeStatus.valueOf(statut)).stream().map(visiteMapper::toResponse).collect(Collectors.toList());
        } catch (Exception e) {
            return List.of();
        }
    }

    @Override
    public void delete(Long id) {
        visiteRepository.deleteById(id);
    }

    @Override
    public visiteResponse checkIn(Long id) {
        Visite v = visiteRepository.findById(id).orElse(null);
        if (v == null) return null;
        v.setHEntree(java.time.LocalDateTime.now());
        v.setStatut(com.NativIA.GestionVisite.Enum.typeStatus.EN_COURS);
        Visite saved = visiteRepository.save(v);
        return visiteMapper.toResponse(saved);
    }

    @Override
    public visiteResponse checkOut(Long id) {
        Visite v = visiteRepository.findById(id).orElse(null);
        if (v == null) return null;
        v.setHSortie(java.time.LocalDateTime.now());
        v.setStatut(com.NativIA.GestionVisite.Enum.typeStatus.TERMINEE);
        Visite saved = visiteRepository.save(v);
        return visiteMapper.toResponse(saved);
    }

    @Override
    public List<Visite> findAll() {
        return visiteRepository.findAll();
    }

}
