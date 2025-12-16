# TODO - Implémentation des Statistiques par Période

## Étapes à Compléter

- [x] Modifier la méthode `getStatsByPeriode` dans `StatistiqueServiceImpl.java` pour agréger les visites par date.
- [x] Pour chaque date dans la période, créer un objet `Statistique` avec :
  - `periode` : la date.
  - `nombreVisites` : le nombre de visites ce jour-là.
  - Autres champs (`nombreRDV`, `nombreSoumissions`, `dureeMoyenneMinutes`) initialisés à 0 ou null.
- [x] Sauvegarder chaque `Statistique` en base via `statistiqueRepository.save`.
- [x] Mapper les objets `Statistique` vers `statistiqueResponse` et retourner la liste.
- [ ] Tester l'implémentation pour s'assurer qu'elle fonctionne correctement.
