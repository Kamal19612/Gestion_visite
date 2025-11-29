package com.NativIA.GestionVisite.Services;

import java.util.List;

import com.NativIA.GestionVisite.DTO.Request.userRequest;
import com.NativIA.GestionVisite.DTO.Response.userResponse;

public interface userService {

    userResponse create(userRequest request);

    userResponse getById(Long id);

    List<userResponse> getAll();

    void delete(Long id);

}
