package com.NativIA.GestionVisite.mapper;

import org.springframework.stereotype.Component;

import com.NativIA.GestionVisite.DTO.Request.notificationRequest;
import com.NativIA.GestionVisite.DTO.Response.notificationResponse;
import com.NativIA.GestionVisite.Entities.Notification;

@Component
public class NotificationMapper {

    public Notification toEntity(notificationRequest req) {
        if (req == null) return null;
        Notification n = Notification.builder()
                .message(req.getMessage())
                .date(req.getDate())
                .statut(false)
                .build();
        return n;
    }

    public notificationResponse toResponse(Notification n) {
        if (n == null) return null;
        notificationResponse r = notificationResponse.builder()
                .message(n.getMessage())
                .name(null)
                .build();
        return r;
    }

    public void updateEntity(Notification target, notificationRequest req) {
        if (target == null || req == null) return;
        if (req.getMessage() != null) target.setMessage(req.getMessage());
        if (req.getDate() != null) target.setDate(req.getDate());
    }

}
