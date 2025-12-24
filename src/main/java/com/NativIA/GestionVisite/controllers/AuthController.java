package com.NativIA.GestionVisite.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.NativIA.GestionVisite.DAO.userRepository;
import com.NativIA.GestionVisite.DTO.Request.LoginRequest;
import com.NativIA.GestionVisite.DTO.Request.userRequest;
import com.NativIA.GestionVisite.DTO.Response.userResponse;
import com.NativIA.GestionVisite.Entities.User;
import com.NativIA.GestionVisite.Enum.Roles;
import com.NativIA.GestionVisite.Services.EmailService;
import com.NativIA.GestionVisite.Services.VerificationCodeService;
import com.NativIA.GestionVisite.mapper.UserMapper;
import com.NativIA.GestionVisite.security.JwtUtil;
import com.NativIA.GestionVisite.security.RevokedTokenService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    @Autowired
    private userRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RevokedTokenService revokedTokenService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired(required = false)
    private EmailService emailService;

    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Create a new user account and send verification email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User registered successfully, verification code sent"),
        @ApiResponse(responseCode = "400", description = "Email already in use")
    })
    public ResponseEntity<?> register(@Valid @RequestBody userRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email déjà utilisé"));
        }

        if (request.getPassword() == null || !request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Les mots de passe ne correspondent pas"));
        }

        try {
            User u = userMapper.toEntity(request);
            // Ensure self-registration defaults to VISITEUR
            u.setRole(Roles.VISITEUR);
            u.setPassword(passwordEncoder.encode(request.getPassword()));
            u.setEmailVerified(false);
            User saved = userRepository.save(u);

            // Generate and send verification code
            String verificationCode = verificationCodeService.generateVerificationCode(saved.getEmail());

            if (emailService != null) {
                emailService.sendVerificationCodeEmail(saved.getEmail(), verificationCode);
                log.info("Verification code sent to: {}", saved.getEmail());
            } else {
                log.warn("EmailService not configured. Verification code: {} for {}", verificationCode, saved.getEmail());
            }

            userResponse resp = userMapper.toResponse(saved);
            return ResponseEntity.ok(Map.of(
                    "message", "Inscription réussie. Veuillez vérifier votre email pour confirmer votre compte.",
                    "user", resp,
                    "requiresVerification", true
            ));

        } catch (Exception e) {
            log.error("Error during registration: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", "Erreur lors de l'inscription: " + e.getMessage()));
        }
    }

    @PostMapping("/verify-email")
    @Operation(summary = "Verify email with code", description = "Verify user email using verification code")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Email verified successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid or expired code")
    })
    public ResponseEntity<?> verifyEmail(@RequestParam String email, @RequestParam String code) {
        try {
            if (!verificationCodeService.validateVerificationCode(email, code)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Code de vérification invalide ou expiré"));
            }

            // Mark email as verified
            var user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                User u = user.get();
                u.setEmailVerified(true);
                userRepository.save(u);
                verificationCodeService.markEmailAsVerified(email);
                if (emailService != null) {
                    emailService.sendEmail(email, "Compte confirmé - GestionVisite", "Votre compte a été confirmé avec succès.");
                }
                return ResponseEntity.ok(Map.of("message", "Email vérifié avec succès"));
            }

            return ResponseEntity.badRequest().body(Map.of("error", "Utilisateur non trouvé"));

        } catch (Exception e) {
            log.error("Error verifying email: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", "Erreur lors de la vérification"));
        }
    }

    @PostMapping("/resend-verification")
    @Operation(summary = "Resend verification code", description = "Resend verification code to user email")
    public ResponseEntity<?> resendVerification(@RequestParam String email) {
        try {
            var user = userRepository.findByEmail(email);
            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Utilisateur non trouvé"));
            }

            String verificationCode = verificationCodeService.generateVerificationCode(email);

            if (emailService != null) {
                emailService.sendVerificationCodeEmail(email, verificationCode);
                return ResponseEntity.ok(Map.of("message", "Code de vérification renvoyé"));
            }

            return ResponseEntity.ok(Map.of("message", "Code de vérification renvoyé", "code", verificationCode));

        } catch (Exception e) {
            log.error("Error resending verification: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", "Erreur lors du renvoi du code"));
        }
    }

    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Authenticate user and return JWT token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful"),
        @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User u = userRepository.findByEmail(request.getEmail()).orElse(null);
            if (u == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
            }

            if (!passwordEncoder.matches(request.getPassword(), u.getPassword())) {
                u.setFailedLoginAttempts(u.getFailedLoginAttempts() + 1);
                userRepository.save(u);

                // If failed attempts reached 3, notify admins
                if (u.getFailedLoginAttempts() != null && u.getFailedLoginAttempts() >= 3) {
                    try {
                        if (emailService != null) {
                            java.util.List<com.NativIA.GestionVisite.Entities.User> admins = userRepository.findAll().stream()
                                    .filter(x -> x.getRole() == Roles.ADMIN)
                                    .toList();
                            for (var admin : admins) {
                                if (admin.getEmail() != null) {
                                    emailService.sendEmail(admin.getEmail(), "Alerte tentatives de connexion", "L'utilisateur " + u.getEmail() + " a échoué 3 tentatives de connexion.");
                                }
                            }
                        }
                    } catch (Exception ex) {
                        // ignore notification failures
                    }

                }

                return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
            }

            // Reset failed attempts on successful login
            u.setFailedLoginAttempts(0);
            userRepository.save(u);

            String jwt = jwtUtil.generateToken(u);
            userResponse userDto = userMapper.toResponse(u);
            return ResponseEntity.ok(Map.of(
                    "token", jwt,
                    "user", userDto
            ));

        } catch (Exception e) {
            log.error("Error during login: {}", e.getMessage());
            return ResponseEntity.status(500).body(Map.of("error", "Login error"));
        }
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user", description = "Returns current user profile")
    public ResponseEntity<?> me() {
        try {
            org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || auth.getName() == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
            }
            var userOpt = userRepository.findByEmail(auth.getName());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }
            userResponse resp = userMapper.toResponse(userOpt.get());
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Unable to retrieve profile"));
        }
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user", description = "Revoke user JWT token")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String tokenValue = header.substring(7);
            try {
                io.jsonwebtoken.Claims claims = jwtUtil.validateAndGetClaims(tokenValue);
                java.util.Date exp = claims.getExpiration();
                long expMillis = exp != null ? exp.getTime() : (System.currentTimeMillis());
                revokedTokenService.revoke(tokenValue, expMillis);
                return ResponseEntity.ok(Map.of("status", "logged_out"));
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid token"));
            }
        }
        return ResponseEntity.badRequest().body(Map.of("error", "No token provided"));
    }

}
