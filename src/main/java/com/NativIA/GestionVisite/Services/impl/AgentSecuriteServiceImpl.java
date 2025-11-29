package com.NativIA.GestionVisite.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.agentSecuriteRepository;
import com.NativIA.GestionVisite.DTO.Request.ASRequest;
import com.NativIA.GestionVisite.DTO.Response.ASResponse;
import com.NativIA.GestionVisite.Entities.AgentSecurite;
import com.NativIA.GestionVisite.Services.agentSecuriteService;
import com.NativIA.GestionVisite.mapper.AgentSecuriteMapper;

@Service
@Transactional
public class AgentSecuriteServiceImpl implements agentSecuriteService {

    @Autowired
    private agentSecuriteRepository agentSecuriteRepository;

    @Autowired
    private AgentSecuriteMapper agentSecuriteMapper;

    @Override
    public ASResponse create(ASRequest request) {
        AgentSecurite a = agentSecuriteMapper.toEntity(request);
        return agentSecuriteMapper.toResponse(agentSecuriteRepository.save(a));
    }

    @Override
    public ASResponse getById(Long id) {
        return agentSecuriteRepository.findById(id).map(agentSecuriteMapper::toResponse).orElse(null);
    }

    @Override
    public List<ASResponse> getAll() {
        return agentSecuriteRepository.findAll().stream().map(agentSecuriteMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public ASResponse findByMatricule(String matricule) {
        return agentSecuriteRepository.findByMatricule(matricule).map(agentSecuriteMapper::toResponse).orElse(null);
    }

    @Override
    public void delete(Long id) {
        agentSecuriteRepository.deleteById(id);
    }

}
