package com.NativIA.GestionVisite.Services;

import org.springframework.web.multipart.MultipartFile;

public interface S3Service {
    /**
     * Upload a file to S3 bucket
     * @param file the multipart file to upload
     * @param keyPrefix the prefix/folder path in S3 (e.g., "signatures/", "documents/")
     * @return the full S3 key (path) of the uploaded file
     */
    String uploadFile(MultipartFile file, String keyPrefix);

    /**
     * Delete a file from S3 bucket
     * @param s3Key the full S3 key to delete
     */
    void deleteFile(String s3Key);

    /**
     * Get a pre-signed URL for accessing a file in S3
     * @param s3Key the full S3 key
     * @param expirationMinutes minutes until URL expires
     * @return the pre-signed URL
     */
    String getPresignedUrl(String s3Key, int expirationMinutes);

    /**
     * Check if S3 is enabled and configured
     */
    boolean isEnabled();
}
