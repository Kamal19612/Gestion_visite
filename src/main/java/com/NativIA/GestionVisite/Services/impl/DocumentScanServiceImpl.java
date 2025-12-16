package com.NativIA.GestionVisite.Services.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.NativIA.GestionVisite.Services.DocumentScanService;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

@Service
public class DocumentScanServiceImpl implements DocumentScanService {

    private static final Logger log = LoggerFactory.getLogger(DocumentScanServiceImpl.class);

    @Override
    public String scanDocument(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            log.warn("Attempt to scan empty or null file");
            return "";
        }

        File tempFile = null;
        try {
            tempFile = convertMultiPartToFile(file);
            ITesseract tesseract = new Tesseract();
            // Si nécessaire, configurez le datapath de tessdata via configuration
            // tesseract.setDatapath("/usr/share/tessdata");
            String result = tesseract.doOCR(tempFile);
            return result != null ? result : "";
        } catch (IOException | TesseractException e) {
            log.error("Erreur lors du scan du document", e);
            return "";
        } finally {
            if (tempFile != null && tempFile.exists()) {
                boolean deleted = tempFile.delete();
                if (!deleted) log.debug("Temporary file not deleted: {}", tempFile.getAbsolutePath());
            }
        }
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        String filename = Objects.requireNonNull(file.getOriginalFilename());
        File convFile = new File(System.getProperty("java.io.tmpdir"), filename);
        try (OutputStream os = new FileOutputStream(convFile)) {
            os.write(file.getBytes());
        }
        return convFile;
    }
}
