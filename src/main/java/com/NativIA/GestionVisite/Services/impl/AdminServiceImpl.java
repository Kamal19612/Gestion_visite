package com.NativIA.GestionVisite.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.adminRepository;
import com.NativIA.GestionVisite.DTO.Request.adminRequest;
import com.NativIA.GestionVisite.DTO.Response.adminResponse;
import com.NativIA.GestionVisite.Entities.Admin;
import com.NativIA.GestionVisite.Services.adminService;
import com.NativIA.GestionVisite.mapper.AdminMapper;

@Service
@Transactional
public class AdminServiceImpl implements adminService {

    @Autowired
    private adminRepository adminRepository;

    @Autowired
    private AdminMapper adminMapper;

    @Override
    public adminResponse create(adminRequest request) {
        Admin a = adminMapper.toEntity(request);
        return adminMapper.toResponse(adminRepository.save(a));
    }

    @Override
    public adminResponse getById(Long id) {
        return adminRepository.findById(id).map(adminMapper::toResponse).orElse(null);
    }

    @Override
    public List<adminResponse> getAll() {
        return adminRepository.findAll().stream().map(adminMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<adminResponse> findByPrivileges(String privileges) {
        return adminRepository.findByPrivileges(privileges).stream().map(adminMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        adminRepository.deleteById(id);
    }

}
