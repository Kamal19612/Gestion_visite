package com.NativIA.GestionVisite.Services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NativIA.GestionVisite.DAO.notificationRepository;
import com.NativIA.GestionVisite.DTO.Request.notificationRequest;
import com.NativIA.GestionVisite.DTO.Response.notificationResponse;
import com.NativIA.GestionVisite.Entities.Notification;
import com.NativIA.GestionVisite.Services.notificationService;
import com.NativIA.GestionVisite.mapper.NotificationMapper;

@Service
@Transactional
public class NotificationServiceImpl implements notificationService {

    @Autowired
    private notificationRepository notificationRepository;

    @Autowired
    private NotificationMapper notificationMapper;

    @Override
    public notificationResponse create(notificationRequest request) {
        Notification n = notificationMapper.toEntity(request);
        return notificationMapper.toResponse(notificationRepository.save(n));
    }

    @Override
    public notificationResponse getById(Long id) {
        return notificationRepository.findById(id).map(notificationMapper::toResponse).orElse(null);
    }

    @Override
    public List<notificationResponse> getAll() {
        return notificationRepository.findAll().stream().map(notificationMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<notificationResponse> findByVisiteId(Long visiteId) {
        return notificationRepository.findByVisite_Id(visiteId).stream().map(notificationMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }

}
