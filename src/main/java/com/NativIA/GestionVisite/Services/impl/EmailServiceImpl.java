package com.NativIA.GestionVisite.Services.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.NativIA.GestionVisite.Services.EmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${app.email.from:noreply@gestionvisite.com}")
    private String fromEmail;

    @Value("${app.email.from-name:GestionVisite}")
    private String fromName;

    @Override
    public void sendEmail(String to, String subject, String body) {
        if (mailSender == null) {
            log.warn("JavaMailSender not configured. Email not sent to: {}", to);
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            try {
                helper.setFrom(fromEmail, fromName);
            } catch (java.io.UnsupportedEncodingException e) {
                helper.setFrom(fromEmail);
            }
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true); // true = HTML content

            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);

        } catch (MessagingException e) {
            log.error("Failed to send email to: {} - Error: {}", to, e.getMessage());
        }
    }

    @Override
    public void sendEmailToMultiple(String[] to, String subject, String body) {
        if (mailSender == null) {
            log.warn("JavaMailSender not configured. Email not sent to: {}", java.util.Arrays.toString(to));
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            try {
                helper.setFrom(fromEmail, fromName);
            } catch (java.io.UnsupportedEncodingException e) {
                helper.setFrom(fromEmail);
            }
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
            log.info("Email sent successfully to {} recipients", to.length);

        } catch (MessagingException e) {
            log.error("Failed to send email to multiple recipients - Error: {}", e.getMessage());
        }
    }

    @Override
    public void sendAppointmentApprovalEmail(String visitorEmail, String visitorName, String appointmentDate, String appointmentTime) {
        String subject = "Votre rendez-vous a été approuvé";
        String body = buildAppointmentApprovalTemplate(visitorName, appointmentDate, appointmentTime);
        sendEmail(visitorEmail, subject, body);
    }

    @Override
    public void sendAppointmentRejectionEmail(String visitorEmail, String visitorName, String reason) {
        String subject = "Votre demande de rendez-vous a été rejetée";
        String body = buildAppointmentRejectionTemplate(visitorName, reason);
        sendEmail(visitorEmail, subject, body);
    }

    @Override
    public void sendVerificationCodeEmail(String email, String verificationCode) {
        String subject = "Votre code de vérification GestionVisite";
        String body = buildVerificationCodeTemplate(verificationCode);
        sendEmail(email, subject, body);
    }

    @Override
    public void sendSecretaryNotificationEmail(String secretaryEmail, String visitorName, String appointmentDate, String appointmentTime) {
        String subject = "Nouvelle demande de rendez-vous";
        String body = buildSecretaryNotificationTemplate(visitorName, appointmentDate, appointmentTime);
        sendEmail(secretaryEmail, subject, body);
    }

    private String buildAppointmentApprovalTemplate(String visitorName, String appointmentDate, String appointmentTime) {
        return String.format("""
            <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #2c5aa0;">Rendez-vous Approuvé</h2>
                    <p>Bonjour <strong>%s</strong>,</p>
                    <p>Nous sommes heureux de vous confirmer que votre demande de rendez-vous a été approuvée.</p>
                    <div style="background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #2c5aa0;">
                        <p><strong>Date:</strong> %s</p>
                        <p><strong>Heure:</strong> %s</p>
                    </div>
                    <p>Veuillez arriver 10 minutes avant l'heure prévue.</p>
                    <p>Cordialement,<br/>L'équipe GestionVisite</p>
                </div>
            </body>
            </html>
            """, visitorName, appointmentDate, appointmentTime);
    }

    private String buildAppointmentRejectionTemplate(String visitorName, String reason) {
        return String.format("""
            <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <div style="background-color: #fff0f0; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #d32f2f;">Demande de Rendez-vous Rejetée</h2>
                    <p>Bonjour <strong>%s</strong>,</p>
                    <p>Nous avons examiné votre demande de rendez-vous. Malheureusement, nous ne pouvons pas l'accepter.</p>
                    <div style="background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #d32f2f;">
                        <p><strong>Raison:</strong></p>
                        <p>%s</p>
                    </div>
                    <p>N'hésitez pas à soumettre une nouvelle demande.</p>
                    <p>Cordialement,<br/>L'équipe GestionVisite</p>
                </div>
            </body>
            </html>
            """, visitorName, reason != null ? reason : "Non spécifiée");
    }

    private String buildVerificationCodeTemplate(String verificationCode) {
        return String.format("""
            <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #2c5aa0;">Code de Vérification</h2>
                    <p>Voici votre code de vérification GestionVisite:</p>
                    <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center;">
                        <p style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2c5aa0;">%s</p>
                    </div>
                    <p>Ce code expire dans 10 minutes.</p>
                    <p>Cordialement,<br/>L'équipe GestionVisite</p>
                </div>
            </body>
            </html>
            """, verificationCode);
    }

    private String buildSecretaryNotificationTemplate(String visitorName, String appointmentDate, String appointmentTime) {
        return String.format("""
            <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #f57c00;">Nouvelle Demande de Rendez-vous</h2>
                    <p>Une nouvelle demande de rendez-vous a été soumise:</p>
                    <div style="background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #f57c00;">
                        <p><strong>Visiteur:</strong> %s</p>
                        <p><strong>Date demandée:</strong> %s</p>
                        <p><strong>Heure demandée:</strong> %s</p>
                    </div>
                    <p>Veuillez consulter l'application pour approuver ou rejeter cette demande.</p>
                    <p>Cordialement,<br/>GestionVisite</p>
                </div>
            </body>
            </html>
            """, visitorName, appointmentDate, appointmentTime);
    }

    @Override
    public void sendApprovalEmail(String visitorEmail, String visitorName, Map<String, Object> variables) {
        String appointmentDate = variables.getOrDefault("dateRendezVous", "").toString();
        String appointmentTime = variables.getOrDefault("heureRendezVous", "").toString();
        String comments = variables.getOrDefault("comments", "").toString();
        String reason = variables.getOrDefault("reason", "").toString();

        String subject = "Votre rendez-vous a été approuvé";
        StringBuilder bodyBuilder = new StringBuilder();
        bodyBuilder.append("<html><body style=\"font-family: Arial, sans-serif; padding: 20px;\">")
                .append("<div style=\"background-color: #f0f7ff; padding: 20px; border-radius: 8px;\">")
                .append("<h2 style=\"color: #2c5aa0;\">Rendez-vous Approuvé</h2>")
                .append("<p>Bonjour <strong>").append(visitorName).append("</strong>,</p>")
                .append("<p>Votre demande a été approuvée.")
                .append(reason != null && !reason.isBlank() ? " Raison: " + reason : "")
                .append("</p>")
                .append("<div style=\"background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #2c5aa0;\">")
                .append("<p><strong>Date:</strong> ").append(appointmentDate).append("</p>")
                .append("<p><strong>Heure:</strong> ").append(appointmentTime).append("</p>")
                .append("<p><strong>Commentaires:</strong> ").append(comments).append("</p>")
                .append("</div>")
                .append("<p>Cordialement,<br/>L'équipe GestionVisite</p>")
                .append("</div></body></html>");

        sendEmail(visitorEmail, subject, bodyBuilder.toString());
    }

    @Override
    public void sendRejectionEmail(String visitorEmail, String visitorName, Map<String, Object> variables) {
        String reason = variables.getOrDefault("reason", "").toString();
        String comments = variables.getOrDefault("comments", "").toString();

        String subject = "Votre demande de rendez-vous a été rejetée";
        StringBuilder bodyBuilder = new StringBuilder();
        bodyBuilder.append("<html><body style=\"font-family: Arial, sans-serif; padding: 20px;\">")
                .append("<div style=\"background-color: #fff0f0; padding: 20px; border-radius: 8px;\">")
                .append("<h2 style=\"color: #d32f2f;\">Demande de Rendez-vous Rejetée</h2>")
                .append("<p>Bonjour <strong>").append(visitorName).append("</strong>,</p>")
                .append("<p>Malheureusement votre demande a été rejetée.")
                .append(reason != null && !reason.isBlank() ? " Raison: " + reason : "")
                .append("</p>")
                .append("<div style=\"background-color: white; padding: 15px; margin: 20px 0; border-left: 4px solid #d32f2f;\">")
                .append("<p><strong>Commentaires:</strong></p><p>").append(comments).append("</p>")
                .append("</div>")
                .append("<p>N'hésitez pas à soumettre une nouvelle demande.</p>")
                .append("<p>Cordialement,<br/>L'équipe GestionVisite</p>")
                .append("</div></body></html>");

        sendEmail(visitorEmail, subject, bodyBuilder.toString());
    }
}
