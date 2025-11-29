package com.NativIA.GestionVisite.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.secretaireRepository;
import com.NativIA.GestionVisite.DTO.Request.secretaireRequest;
import com.NativIA.GestionVisite.DTO.Response.secretaireResponse;
import com.NativIA.GestionVisite.Entities.Secretaire;
import com.NativIA.GestionVisite.Services.secretaireService;
import com.NativIA.GestionVisite.mapper.SecretaireMapper;

@Service
@Transactional
public class SecretaireServiceImpl implements secretaireService {

    @Autowired
    private secretaireRepository secretaireRepository;

    @Autowired
    private SecretaireMapper secretaireMapper;

    @Override
    public secretaireResponse create(secretaireRequest request) {
        Secretaire s = secretaireMapper.toEntity(request);
        return secretaireMapper.toResponse(secretaireRepository.save(s));
    }

    @Override
    public secretaireResponse getById(Long id) {
        return secretaireRepository.findById(id).map(secretaireMapper::toResponse).orElse(null);
    }

    @Override
    public List<secretaireResponse> getAll() {
        return secretaireRepository.findAll().stream().map(secretaireMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<secretaireResponse> findByDepartement(String departement) {
        return secretaireRepository.findByDepartement(departement).stream().map(secretaireMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        secretaireRepository.deleteById(id);
    }

}
