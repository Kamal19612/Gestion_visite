package com.NativIA.GestionVisite.Services;

import java.util.Map;

public interface EmailService {
    /**
     * Send email to a recipient
     * @param to recipient email address
     * @param subject email subject
     * @param body email body (HTML supported)
     */
    void sendEmail(String to, String subject, String body);

    /**
     * Send email to multiple recipients
     * @param to array of recipient email addresses
     * @param subject email subject
     * @param body email body (HTML supported)
     */
    void sendEmailToMultiple(String[] to, String subject, String body);

    /**
     * Send appointment approval email to visitor
     * @param visitorEmail visitor email address
     * @param visitorName visitor name
     * @param appointmentDate appointment date
     * @param appointmentTime appointment time
     */
    void sendAppointmentApprovalEmail(String visitorEmail, String visitorName, String appointmentDate, String appointmentTime);

    /**
     * Send appointment rejection email to visitor
     * @param visitorEmail visitor email address
     * @param visitorName visitor name
     * @param reason rejection reason
     */
    void sendAppointmentRejectionEmail(String visitorEmail, String visitorName, String reason);

    /**
     * Send email verification code to user
     * @param email user email address
     * @param verificationCode the verification code
     */
    void sendVerificationCodeEmail(String email, String verificationCode);

    /**
     * Send secretary notification for new appointment
     * @param secretaryEmail secretary email address
     * @param visitorName visitor name
     * @param appointmentDate appointment date
     * @param appointmentTime appointment time
     */
    void sendSecretaryNotificationEmail(String secretaryEmail, String visitorName, String appointmentDate, String appointmentTime);

    /**
     * Send approval notification email with customizable variables
     * @param visitorEmail visitor email address
     * @param visitorName visitor name
     * @param variables template variables (reason, comments, etc.)
     */
    void sendApprovalEmail(String visitorEmail, String visitorName, Map<String, Object> variables);

    /**
     * Send rejection notification email with customizable variables
     * @param visitorEmail visitor email address
     * @param visitorName visitor name
     * @param variables template variables (reason, comments, etc.)
     */
    void sendRejectionEmail(String visitorEmail, String visitorName, Map<String, Object> variables);
}

