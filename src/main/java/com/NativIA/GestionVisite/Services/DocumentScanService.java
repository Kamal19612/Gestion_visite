package com.NativIA.GestionVisite.Services;

import org.springframework.web.multipart.MultipartFile;

public interface DocumentScanService {
    String scanDocument(MultipartFile file);
}
