package com.NativIA.GestionVisite.Services;

import java.time.LocalDate;
import java.time.LocalTime;

public interface ConflictDetectionService {
    /**
     * Check if there is a conflicting rendez-vous at the given date/time
     */
    boolean hasConflict(LocalDate date, LocalTime heure);
}
