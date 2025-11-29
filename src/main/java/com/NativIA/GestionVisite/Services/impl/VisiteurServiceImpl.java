package com.NativIA.GestionVisite.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.visiteurRepository;
import com.NativIA.GestionVisite.DTO.Request.visiteurRequest;
import com.NativIA.GestionVisite.DTO.Response.visiteurResponse;
import com.NativIA.GestionVisite.Entities.Visiteur;
import com.NativIA.GestionVisite.Services.visiteurService;
import com.NativIA.GestionVisite.mapper.VisiteurMapper;

@Service
@Transactional
public class VisiteurServiceImpl implements visiteurService {

    @Autowired
    private visiteurRepository visiteurRepository;

    @Autowired
    private VisiteurMapper visiteurMapper;

    @Override
    public visiteurResponse create(visiteurRequest request) {
        Visiteur existing = visiteurRepository.findByEmail(request.getEmail()).orElse(null);
        if (existing != null) {
            visiteurMapper.updateEntity(existing, request);
            return visiteurMapper.toResponse(visiteurRepository.save(existing));
        }
        Visiteur v = visiteurMapper.toEntity(request);
        return visiteurMapper.toResponse(visiteurRepository.save(v));
    }

    @Override
    public visiteurResponse getById(Long id) {
        return visiteurRepository.findById(id).map(visiteurMapper::toResponse).orElse(null);
    }

    @Override
    public List<visiteurResponse> getAll() {
        return visiteurRepository.findAll().stream().map(visiteurMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        visiteurRepository.deleteById(id);
    }

}
