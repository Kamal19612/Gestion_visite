package com.NativIA.GestionVisite.Enum;

public enum typeStatus {
    EN_ATTENTE,   // Pending approval
    APPROUVEE,    // Approved by secretary
    REJETEE,      // Rejected by secretary
    PLANIFIEE,    // Scheduled (synonym for approved/confirmed)
    EN_COURS,     // Happening now
    TERMINEE,     // Completed
    ANNULEE       // Cancelled
}
