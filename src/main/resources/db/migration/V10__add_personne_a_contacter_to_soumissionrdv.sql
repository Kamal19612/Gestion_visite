-- Add personne_a_contacter to soumissionRDV if missing
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'soumissionrdv' AND column_name = 'personne_a_contacter'
    ) THEN
        ALTER TABLE soumissionRDV ADD COLUMN personne_a_contacter VARCHAR(255);
    END IF;
END $$;
