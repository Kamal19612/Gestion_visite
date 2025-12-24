Changements implémentés (décembre 2025)

- `userRequest` : ajout de `confirmPassword` et validation côté serveur.
- `AuthController.register` : validation que `password` == `confirmPassword`.
- `AuthController.verifyEmail` : envoi d'un e-mail de confirmation après vérification du code.
- `AuthController.login` : alerte par e-mail aux administrateurs après 3 tentatives de connexion échouées.
- `SoumissionServiceImpl.create` : notification des secrétaires du département lors de la création d'une soumission (utilise `secretaireRepository` et `EmailService`).
- `rendezVousRepository` : ajout de `findByVisiteur_Email(String email)`.
- `rendezVousService` et `RendezVousServiceImpl` : ajout de `findByVisiteurEmail(String email)`.
- `RendezVousController` : ajout de l'endpoint `GET /api/v1/rendezvous/mine` pour retourner les RDV du visiteur authentifié.

Remarques :
- Les envois d'e-mails nécessitent la configuration `spring.mail` dans `application.properties` (déjà présente). Si le `JavaMailSender` n'est pas configuré, les appels sont silencieux (log seulement).
- Les admins sont déterminés par les utilisateurs avec `role == Roles.ADMIN` présents en base.

Prochaines étapes recommandées : lancer les tests Maven et corriger les erreurs unitaires.
