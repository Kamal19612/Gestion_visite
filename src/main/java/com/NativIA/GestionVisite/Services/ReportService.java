package com.NativIA.GestionVisite.Services;

import com.NativIA.GestionVisite.Entities.Visite;
import java.io.ByteArrayInputStream;
import java.util.List;

public interface ReportService {
    ByteArrayInputStream generateVisitesPdfReport(List<Visite> visites);
    ByteArrayInputStream generateVisitesExcelReport(List<Visite> visites);
}
