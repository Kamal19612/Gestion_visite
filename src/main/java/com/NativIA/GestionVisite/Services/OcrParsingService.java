package com.NativIA.GestionVisite.Services;

import java.util.Map;

public interface OcrParsingService {
    Map<String, String> parseIdCard(String ocrText);
}
