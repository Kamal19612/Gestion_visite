-- V3: Ajouter les colonnes manquantes à la table visites si nécessaire
-- Vérifier et ajouter signaturePath si elle n'existe pas

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'visites' AND column_name = 'signaturepath'
    ) THEN
        -- Colonne existe déjà, rien à faire
        NULL;
    ELSE
        -- Ajouter la colonne
        ALTER TABLE visites ADD COLUMN IF NOT EXISTS signature_path VARCHAR(500);
        COMMENT ON COLUMN visites.signature_path IS 'Chemin du fichier de signature électronique de la visite';
    END IF;
END$$;

