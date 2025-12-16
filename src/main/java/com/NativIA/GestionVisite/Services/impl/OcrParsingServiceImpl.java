package com.NativIA.GestionVisite.Services.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.NativIA.GestionVisite.Services.OcrParsingService;

@Service
public class OcrParsingServiceImpl implements OcrParsingService {

    // Regex for French ID Cards (example)
    // This is a simplified example. A robust solution would require more complex patterns.
    private static final Pattern NOM_PATTERN = Pattern.compile("Nom(?:\\sde\\snaissance)?\\s*:\\s*([A-Z\\s'-]+)", Pattern.CASE_INSENSITIVE);
    private static final Pattern PRENOMS_PATTERN = Pattern.compile("Prénoms\\s*:\\s*([A-Za-z\\s'-]+)", Pattern.CASE_INSENSITIVE);


    @Override
    public Map<String, String> parseIdCard(String ocrText) {
        Map<String, String> extractedData = new HashMap<>();

        if (ocrText == null || ocrText.isEmpty()) {
            return extractedData;
        }

        Matcher nomMatcher = NOM_PATTERN.matcher(ocrText);
        if (nomMatcher.find()) {
            extractedData.put("nom", nomMatcher.group(1).trim());
        }

        Matcher prenomsMatcher = PRENOMS_PATTERN.matcher(ocrText);
        if (prenomsMatcher.find()) {
            extractedData.put("prenoms", prenomsMatcher.group(1).trim());
        }

        return extractedData;
    }
}
