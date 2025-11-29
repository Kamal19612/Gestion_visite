package com.NativIA.GestionVisite.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.soumissionRepository;
import com.NativIA.GestionVisite.DTO.Request.soumissionRequest;
import com.NativIA.GestionVisite.DTO.Response.soumissionResponse;
import com.NativIA.GestionVisite.Entities.SoumissionRDV;
import com.NativIA.GestionVisite.Services.soumissionService;
import com.NativIA.GestionVisite.mapper.SoumissionMapper;

@Service
@Transactional
public class SoumissionServiceImpl implements soumissionService {

    @Autowired
    private soumissionRepository soumissionRepository;

    @Autowired
    private SoumissionMapper soumissionMapper;

    @Override
    public soumissionResponse create(soumissionRequest request) {
        SoumissionRDV s = soumissionMapper.toEntity(request);
        return soumissionMapper.toResponse(soumissionRepository.save(s));
    }

    @Override
    public soumissionResponse getById(Long id) {
        return soumissionRepository.findById(id).map(soumissionMapper::toResponse).orElse(null);
    }

    @Override
    public List<soumissionResponse> getAll() {
        return soumissionRepository.findAll().stream().map(soumissionMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<soumissionResponse> findByStatut(String statut) {
        return soumissionRepository.findByStatut(statut).stream().map(soumissionMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        soumissionRepository.deleteById(id);
    }

}
