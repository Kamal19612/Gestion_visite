-- Correct and ensure all required columns exist in rendez_vous table
DO $$
DECLARE
    col_exists BOOLEAN;
BEGIN
    -- Check and add motif column
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'rendez_vous' AND column_name = 'motif'
    ) INTO col_exists;
    
    IF NOT col_exists THEN
        ALTER TABLE rendez_vous ADD COLUMN motif VARCHAR(255) NOT NULL DEFAULT '';
    END IF;

    -- Check and add personne_a_rencontrer column
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'rendez_vous' AND column_name = 'personne_a_rencontrer'
    ) INTO col_exists;
    
    IF NOT col_exists THEN
        ALTER TABLE rendez_vous ADD COLUMN personne_a_rencontrer VARCHAR(255) NOT NULL DEFAULT '';
    END IF;

    -- Check and add departement column
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'rendez_vous' AND column_name = 'departement'
    ) INTO col_exists;
    
    IF NOT col_exists THEN
        ALTER TABLE rendez_vous ADD COLUMN departement VARCHAR(255) NOT NULL DEFAULT '';
    END IF;

    -- Check statut column type and fix if needed
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'rendez_vous' 
        AND column_name = 'statut'
        AND data_type != 'character varying'
    ) INTO col_exists;
    
    IF col_exists THEN
        -- Drop and recreate statut column with correct type
        ALTER TABLE rendez_vous DROP COLUMN statut CASCADE;
        ALTER TABLE rendez_vous ADD COLUMN statut VARCHAR(255) DEFAULT 'EN_ATTENTE';
    END IF;
    
END $$;
