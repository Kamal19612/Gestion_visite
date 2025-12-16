package com.NativIA.GestionVisite.Services;

import org.springframework.web.multipart.MultipartFile;

/**
 * Storage service abstraction that can use either S3 or local filesystem
 */
public interface StorageService {
    /**
     * Upload a file (to S3 if enabled, otherwise to local filesystem)
     * @param file the multipart file
     * @param keyPrefix the folder prefix (e.g., "signatures/", "documents/")
     * @return the file path/key
     */
    String uploadFile(MultipartFile file, String keyPrefix);

    /**
     * Delete a file
     * @param filePath the file path or S3 key
     */
    void deleteFile(String filePath);

    /**
     * Get access URL for the file (pre-signed for S3, local URL for filesystem)
     * @param filePath the file path or S3 key
     * @return the URL to access the file
     */
    String getFileUrl(String filePath);

    /**
     * Check which storage backend is being used
     */
    boolean isUsingS3();
}
