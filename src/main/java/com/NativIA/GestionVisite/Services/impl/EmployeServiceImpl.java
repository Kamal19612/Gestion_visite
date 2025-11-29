package com.NativIA.GestionVisite.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.employeRepository;
import com.NativIA.GestionVisite.DTO.Request.employeRequest;
import com.NativIA.GestionVisite.DTO.Response.employeResponse;
import com.NativIA.GestionVisite.Entities.Employe;
import com.NativIA.GestionVisite.Services.employeService;
import com.NativIA.GestionVisite.mapper.EmployeMapper;

@Service
@Transactional
public class EmployeServiceImpl implements employeService {

    @Autowired
    private employeRepository employeRepository;

    @Autowired
    private EmployeMapper employeMapper;

    @Override
    public employeResponse create(employeRequest request) {
        Employe e = employeMapper.toEntity(request);
        return employeMapper.toResponse(employeRepository.save(e));
    }

    @Override
    public employeResponse getById(Long id) {
        return employeRepository.findById(id).map(employeMapper::toResponse).orElse(null);
    }

    @Override
    public List<employeResponse> getAll() {
        return employeRepository.findAll().stream().map(employeMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<employeResponse> findBySecteur(String secteur) {
        return employeRepository.findBySecteurActivite(secteur).stream().map(employeMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        employeRepository.deleteById(id);
    }

}
