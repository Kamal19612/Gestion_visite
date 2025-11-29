package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.adminRequest;
import com.NativIA.GestionVisite.DTO.Response.adminResponse;

public interface adminService {

    adminResponse create(adminRequest request);

    adminResponse getById(Long id);

    List<adminResponse> getAll();

    List<adminResponse> findByPrivileges(String privileges);

    void delete(Long id);

}
