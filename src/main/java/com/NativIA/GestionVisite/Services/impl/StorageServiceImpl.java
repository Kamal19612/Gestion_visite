package com.NativIA.GestionVisite.Services.impl;

import com.NativIA.GestionVisite.Services.S3Service;
import com.NativIA.GestionVisite.Services.StorageService;
import com.NativIA.GestionVisite.configuration.S3ConfigProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class StorageServiceImpl implements StorageService {

    private final S3ConfigProperties s3Config;
    private final Optional<S3Service> s3Service;
    
    @Value("${app.upload.dir:./uploads}")
    private String localUploadDir;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("png", "jpg", "jpeg", "gif", "webp", "pdf");
    private static final long MAX_FILE_SIZE = 50 * 1024 * 1024;

    public StorageServiceImpl(S3ConfigProperties s3Config, Optional<S3Service> s3Service) {
        this.s3Config = s3Config;
        this.s3Service = s3Service;
    }

    @Override
    public String uploadFile(MultipartFile file, String keyPrefix) {
        validateFile(file);
        
        if (isUsingS3()) {
            return s3Service.get().uploadFile(file, keyPrefix);
        } else {
            return uploadToFilesystem(file, keyPrefix);
        }
    }

    @Override
    public void deleteFile(String filePath) {
        if (isUsingS3()) {
            s3Service.get().deleteFile(filePath);
        } else {
            deleteFromFilesystem(filePath);
        }
    }

    @Override
    public String getFileUrl(String filePath) {
        if (isUsingS3()) {
            return s3Service.get().getPresignedUrl(filePath, 60); // 1 hour validity
        } else {
            // Return relative URL for local files
            return "/api/files/" + filePath;
        }
    }

    @Override
    public boolean isUsingS3() {
        return s3Config.isEnabled() && s3Service.isPresent();
    }

    private String uploadToFilesystem(MultipartFile file, String keyPrefix) {
        try {
            Path uploadPath = Paths.get(localUploadDir, keyPrefix);
            Files.createDirectories(uploadPath);

            String originalFilename = Objects.requireNonNull(file.getOriginalFilename());
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
            String uniqueFilename = UUID.randomUUID() + "_" + System.currentTimeMillis() + "." + fileExtension;

            Path filePath = uploadPath.resolve(uniqueFilename);
            Files.write(filePath, file.getBytes());

            log.info("Fichier sauvegardé localement : {}", filePath);
            return keyPrefix + uniqueFilename;

        } catch (IOException e) {
            log.error("Erreur lors de la sauvegarde locale : {}", e.getMessage());
            throw new RuntimeException("Erreur lors de la sauvegarde du fichier: " + e.getMessage());
        }
    }

    private void deleteFromFilesystem(String filePath) {
        try {
            Path path = Paths.get(localUploadDir, filePath);
            Files.deleteIfExists(path);
            log.info("Fichier supprimé localement : {}", filePath);
        } catch (IOException e) {
            log.error("Erreur lors de la suppression locale : {}", e.getMessage());
            throw new RuntimeException("Erreur lors de la suppression du fichier: " + e.getMessage());
        }
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Le fichier ne peut pas être vide");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("La taille du fichier dépasse la limite de 50 MB");
        }

        String originalFilename = Objects.requireNonNull(file.getOriginalFilename());
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();

        if (!ALLOWED_EXTENSIONS.contains(fileExtension)) {
            throw new IllegalArgumentException("Type de fichier non autorisé: " + fileExtension);
        }
    }
}
