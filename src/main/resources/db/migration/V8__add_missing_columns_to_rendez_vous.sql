-- Add missing columns to rendez_vous table
DO $$
BEGIN
    -- Add departement column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'rendez_vous' AND column_name = 'departement'
    ) THEN
        ALTER TABLE rendez_vous ADD COLUMN departement VARCHAR(255) NOT NULL DEFAULT '';
    END IF;

    -- Add motif column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'rendez_vous' AND column_name = 'motif'
    ) THEN
        ALTER TABLE rendez_vous ADD COLUMN motif VARCHAR(255) NOT NULL DEFAULT '';
    END IF;

    -- Add personne_a_rencontrer column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'rendez_vous' AND column_name = 'personne_a_rencontrer'
    ) THEN
        ALTER TABLE rendez_vous ADD COLUMN personne_a_rencontrer VARCHAR(255) NOT NULL DEFAULT '';
    END IF;

    -- Fix statut column type (should be VARCHAR not BOOLEAN)
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'rendez_vous' AND column_name = 'statut' AND data_type = 'boolean'
    ) THEN
        -- Drop column and recreate it
        ALTER TABLE rendez_vous DROP COLUMN statut CASCADE;
        ALTER TABLE rendez_vous ADD COLUMN statut VARCHAR(255) DEFAULT 'EN_ATTENTE';
    END IF;
END $$;
