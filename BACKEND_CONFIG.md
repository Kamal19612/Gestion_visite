# Configuration du Backend

## Variables d'Environnement Recommandées

Créez un fichier `.env` à la racine du projet ou modifiez `application.properties`:

### Base de Données
```properties
# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/GestionVisite
spring.datasource.username=postgres
spring.datasource.password=196120
```

### Serveur
```properties
server.port=8080
spring.application.name=GestionVisite
```

### JWT (ajouter si absent)
```properties
# Clé secrète pour les tokens JWT (modifier en production!)
jwt.secret=votre-clé-secrète-très-longue-et-sécurisée
jwt.expiration=86400000  # 24 heures en millisecondes
```

### Email (Optionnel pour dev)
```properties
# Gmail
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password  # Utiliser App Password, pas le mot de passe normal
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
```

### Fichiers Uploadés
```properties
app.upload.dir=./uploads/signatures
app.max-file-size=5242880  # 5MB
```

### Flyway (Migrations DB)
```properties
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true
spring.flyway.validate-on-migrate=false
```

---

## 📝 Exemple Complet (application.properties)

```properties
# Application
spring.application.name=GestionVisite
server.port=8080

# Base de données PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/GestionVisite
spring.datasource.username=postgres
spring.datasource.password=196120
spring.datasource.driver-class-name=org.postgresql.Driver

# Hibernate/JPA
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.generate-ddl=false
spring.jpa.hibernate.ddl-auto=none

# Flyway
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true
spring.flyway.validate-on-migrate=false

# Upload Files
app.upload.dir=./uploads/signatures
app.max-file-size=5242880

# Email (optionnel)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=5000
spring.mail.properties.mail.smtp.writetimeout=5000

# AWS S3 (optionnel)
aws.s3.enabled=false

# JWT (ajouter ces lignes si absentes)
jwt.secret=gestionvisite-super-secret-key-2024-please-change-in-production-with-a-very-long-key
jwt.expiration=86400000
```

---

## 🔐 Production - Changements Obligatoires

En production, modifiez:

```properties
# JAMAIS les mots de passe par défaut!
spring.datasource.username=admin-user
spring.datasource.password=votre-mot-de-passe-très-sécurisé

# Clé JWT longue et aléatoire
jwt.secret=asdfjk;lejkwfhwefhwerhlwrehwreh923874928373498273498273498

# Email avec véritable compte
spring.mail.username=notification@votredomaine.com
spring.mail.password=mot-de-passe-app

# CORS - Spécifiez votre domaine!
# (À ajouter à CorsConfig.java)
configuration.setAllowedOrigins(List.of("https://votredomaine.com"));
```

---

## ✅ Vérification

Pour vérifier que tout fonctionne:

```bash
# 1. Démarrer le backend
mvn spring-boot:run

# 2. Vérifier que les logs affichent
# "Started GestionVisiteApplication"

# 3. Tester un endpoint
curl http://localhost:8080/api/auth/me

# Devrait retourner: {"error":"Not authenticated"}
# C'est normal, aucun token fourni
```

---

## 🎯 Structure de Sécurité

Le système utilise:
- ✅ **JWT** pour l'authentification stateless
- ✅ **CORS** pour autoriser le frontend
- ✅ **Password Encoding** avec Spring Security
- ✅ **Role-based Access Control** (RBAC)
- ✅ **Token Revocation** pour logout

---

## 📚 Plus d'Info

- Vérifiez `BACKEND_CHECKLIST.md` pour la liste complète
- Consultez `application-test.properties` pour les tests
