package com.NativIA.GestionVisite.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.userRepository;
import com.NativIA.GestionVisite.DTO.Request.userRequest;
import com.NativIA.GestionVisite.DTO.Response.userResponse;
import com.NativIA.GestionVisite.Entities.User;
import com.NativIA.GestionVisite.Services.userService;
import com.NativIA.GestionVisite.mapper.UserMapper;

@Service
@Transactional
public class UserServiceImpl implements userService {

    @Autowired
    private userRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public userResponse create(userRequest request) {
        User existing = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (existing != null) {
            // simple policy: update existing
            userMapper.updateEntity(existing, request);
            // Hash password if it's being updated
            if (request.getPassword() != null && !request.getPassword().isEmpty()) {
                existing.setPassword(passwordEncoder.encode(request.getPassword()));
            }
            User saved = userRepository.save(existing);
            return userMapper.toResponse(saved);
        }
        User u = userMapper.toEntity(request);
        // Hash the password
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            u.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        User saved = userRepository.save(u);
        return userMapper.toResponse(saved);
    }

    @Override
    public userResponse getById(Long id) {
        return userRepository.findById(id).map(userMapper::toResponse).orElse(null);
    }

    @Override
    public List<userResponse> getAll() {
        return userRepository.findAll().stream().map(userMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

}
