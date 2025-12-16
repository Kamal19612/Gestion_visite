-- Créer la table soumissionRDV pour les soumissions de rendez-vous
CREATE TABLE IF NOT EXISTS soumissionRDV (
    id_soumission BIGSERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    departement VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(255) NOT NULL,
    entreprise VARCHAR(255) NOT NULL,
    motif VARCHAR(255) NOT NULL,
    date_rendez_vous DATE NOT NULL,
    heure_rendez_vous TIME NOT NULL,
    statut VARCHAR(100) NOT NULL DEFAULT 'En attente', -- En attente, Approuvée, Rejetée
    rendez_vous BIGINT,
    visiteur_id BIGINT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index sur le statut et l'email pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_soumission_statut ON soumissionRDV(statut);
CREATE INDEX IF NOT EXISTS idx_soumission_email ON soumissionRDV(email);
