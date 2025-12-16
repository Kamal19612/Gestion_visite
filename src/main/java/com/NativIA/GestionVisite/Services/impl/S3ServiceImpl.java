package com.NativIA.GestionVisite.Services.impl;

import com.NativIA.GestionVisite.Services.S3Service;
import com.NativIA.GestionVisite.configuration.S3ConfigProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@ConditionalOnProperty(prefix = "aws.s3", name = "enabled", havingValue = "true")
public class S3ServiceImpl implements S3Service {

    public S3ServiceImpl(S3ConfigProperties s3Config) {
    }

    @Override
    public String uploadFile(MultipartFile file, String keyPrefix) {
        throw new UnsupportedOperationException("S3 est désactive. Utilisez StorageService à la place.");
    }

    @Override
    public void deleteFile(String s3Key) {
        throw new UnsupportedOperationException("S3 est désactive. Utilisez StorageService à la place.");
    }

    @Override
    public String getPresignedUrl(String s3Key, int expirationMinutes) {
        throw new UnsupportedOperationException("S3 est désactive. Utilisez StorageService à la place.");
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
