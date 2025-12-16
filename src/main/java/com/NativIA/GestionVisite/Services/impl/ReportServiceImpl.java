package com.NativIA.GestionVisite.Services.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.NativIA.GestionVisite.Entities.Visite;
import com.NativIA.GestionVisite.Services.ReportService;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.UnitValue;

@Service
public class ReportServiceImpl implements ReportService {

    @Override
    public ByteArrayInputStream generateVisitesPdfReport(List<Visite> visites) {

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            try (Document document = new Document(pdf)) {
                float[] columnWidths = {1, 3, 3, 3, 3, 2, 3, 3};
                Table table = new Table(UnitValue.createPercentArray(columnWidths));
                
                String[] headers = {"ID", "Date", "Heure d'entrée", "Heure de sortie", "Motif", "Statut", "Employé", "Agent de sécurité"};
                for (String header : headers) {
                    table.addHeaderCell(new com.itextpdf.layout.element.Cell().add(new Paragraph(header)));
                }
                
                for (Visite visite : visites) {
                    table.addCell(new com.itextpdf.layout.element.Cell().add(new Paragraph(visite.getId().toString())));
                    table.addCell(new com.itextpdf.layout.element.Cell().add(new Paragraph(visite.getDate() != null ? visite.getDate().toString() : "")));
                    table.addCell(new com.itextpdf.layout.element.Cell().add(new Paragraph(visite.getHEntree() != null ? visite.getHEntree().toString() : "")));
                    table.addCell(new com.itextpdf.layout.element.Cell().add(new Paragraph(visite.getHSortie() != null ? visite.getHSortie().toString() : "")));
                    table.addCell(new com.itextpdf.layout.element.Cell().add(new Paragraph(visite.getMotif())));
                    table.addCell(new com.itextpdf.layout.element.Cell().add(new Paragraph(visite.getStatut() != null ? visite.getStatut().toString() : "")));
                    table.addCell(new com.itextpdf.layout.element.Cell().add(new Paragraph(visite.getEmploye() != null ? visite.getEmploye().getName() : "N/A")));
                    table.addCell(new com.itextpdf.layout.element.Cell().add(new Paragraph(visite.getAgentSecurite() != null ? visite.getAgentSecurite().getName() : "N/A")));
                }
                
                document.add(table);
            }

            return new ByteArrayInputStream(out.toByteArray());
        } catch (Exception e) {
             throw new RuntimeException("fail to import data to PDF file: " + e.getMessage());
        }
    }

    @Override
    public ByteArrayInputStream generateVisitesExcelReport(List<Visite> visites) {
        String[] columns = {"ID", "Date", "Heure d'entrée", "Heure de sortie", "Motif", "Statut", "Employé", "Agent de sécurité"};
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet("Visites");

            // Header
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < columns.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(columns[col]);
            }

            // Data
            int rowIdx = 1;
            for (Visite visite : visites) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(visite.getId());
                row.createCell(1).setCellValue(visite.getDate() != null ? visite.getDate().toString() : "");
                row.createCell(2).setCellValue(visite.getHEntree() != null ? visite.getHEntree().toString() : "");
                row.createCell(3).setCellValue(visite.getHSortie() != null ? visite.getHSortie().toString() : "");
                row.createCell(4).setCellValue(visite.getMotif());
                row.createCell(5).setCellValue(visite.getStatut() != null ? visite.getStatut().toString() : "");
                row.createCell(6).setCellValue(visite.getEmploye() != null ? visite.getEmploye().getName() : "N/A");
                row.createCell(7).setCellValue(visite.getAgentSecurite() != null ? visite.getAgentSecurite().getName() : "N/A");
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
}
