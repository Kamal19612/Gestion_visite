-- Add visiteur_id to rendez_vous if missing
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name='rendez_vous' AND column_name='visiteur_id'
    ) THEN
        ALTER TABLE rendez_vous ADD COLUMN visiteur_id BIGINT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_rdv_visiteur') THEN
        ALTER TABLE rendez_vous ADD CONSTRAINT fk_rdv_visiteur FOREIGN KEY (visiteur_id) REFERENCES users(id);
    END IF;
END$$;
