# 🔧 Backend Checklist - Vérification de Configuration

## ✅ Vérifications à effectuer

### 1. **CORS Configuration**
**Fichier:** `src/main/java/com/NativIA/GestionVisite/configuration/CorsConfig.java`

Vérifiez que le frontend est accepté:
```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",  // ✅ Port Vite (présent)
    "http://localhost:3000"   // Port alternatif
));
```

✅ **Status:** Déjà configuré correctement

---

### 2. **Spring Security**
**Fichier:** `src/main/java/com/NativIA/GestionVisite/configuration/SecurityConfig.java`

Vérifiez que les endpoints publics sont accessibles:
```java
.requestMatchers("/auth/**", "/v3/api-docs/**", "/swagger-ui/**").permitAll()
```

✅ **Status:** `/auth/**` est accessible publiquement

---

### 3. **Authentication Endpoints**
**Fichier:** `src/main/java/com/NativIA/GestionVisite/controllers/AuthController.java`

Les endpoints attendus par le frontend:

| Endpoint | Frontend | Status |
|----------|----------|--------|
| `POST /api/auth/register` | `authService.register()` | ✅ Implémenté |
| `POST /api/auth/login` | `authService.login()` | ✅ Implémenté |
| `POST /api/auth/verify-email` | `authService.verifyEmail()` | ✅ Implémenté |
| `POST /api/auth/resend-verification` | `authService.resendVerification()` | ✅ Implémenté |
| `GET /api/auth/me` | `authService.getProfile()` | ✅ Implémenté |
| `POST /api/auth/logout` | `authService.logout()` | ✅ Implémenté |

✅ **Status:** Tous les endpoints sont implémentés

---

### 4. **Database Configuration**
**Fichier:** `src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/GestionVisite
spring.datasource.username=postgres
spring.datasource.password=196120
```

Vérifiez que:
- PostgreSQL s'exécute sur le port 5432
- Base de données `GestionVisite` existe
- Les identifiants sont corrects

**Pour créer la base de données:**
```sql
CREATE DATABASE "GestionVisite";
```

---

### 5. **Email Configuration** (Optionnel)
**Fichier:** `src/main/resources/application.properties`

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

**Note:** Le code de vérification s'affiche en console si l'email n'est pas configuré.

---

### 6. **JWT Configuration**
Vérifiez que la classe `JwtUtil` est bien implémentée avec:
- ✅ Génération de tokens (`generateToken()`)
- ✅ Validation de tokens (`validateAndGetClaims()`)
- ✅ Extraction du username

---

### 7. **User Entity & Roles**
Vérifiez que l'entité `User` a:
- ✅ Rôles énumérés: `VISITEUR`, `SECRETAIRE`, `AGENT_SECURITE`, `EMPLOYE`, `ADMIN`
- ✅ Champ `emailVerified` (booléen)
- ✅ Champ `failedLoginAttempts` (entier)

---

### 8. **Dependencies**
Vérifiez que `pom.xml` contient:
```xml
<!-- Spring Boot Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
</dependency>

<!-- PostgreSQL -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>

<!-- Spring Mail (optionnel) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

---

## 🚀 Démarrage du Backend

```bash
# Dans le répertoire du projet
mvn spring-boot:run

# Ou en IDE: Alt+Shift+F10 (IntelliJ)
```

Le serveur devrait démarrer sur: `http://localhost:8080`

**Vérifiez les logs:**
```
Started GestionVisiteApplication in X seconds
```

---

## 🧪 Test Rapide

**Depuis PowerShell:**
```powershell
# Vérifier que le backend répond
Invoke-WebRequest -Uri "http://localhost:8080/api/auth/me" -Headers @{"Authorization" = "Bearer invalid"}

# Devrait retourner 401 Unauthorized
```

---

## ⚠️ Problèmes Courants

### ❌ "Cannot find database" 
```
ERROR: relation "users" does not exist
```
**Solution:**
- Vérifiez que PostgreSQL s'exécute
- Vérifiez que la base `GestionVisite` existe
- Lancez les migrations Flyway: `spring.flyway.enabled=true`

### ❌ "CORS error" au login
**Solution:**
- Vérifiez `CorsConfig.java` accepte `http://localhost:5173`
- Redémarrez le backend

### ❌ "JWT token invalid"
**Solution:**
- Vérifiez que `JwtUtil` est bien configuré
- Vérifiez le secret JWT dans les propriétés
- Assurez-vous que le token n'a pas expiré

### ❌ "Email service not configured"
**Solution (normal en développement):**
- C'est un warning, pas une erreur
- Le code de vérification s'affiche en console
- Configurez l'email si nécessaire dans `application.properties`

---

## 📊 Architecture d'Authentification

```
Frontend (React)
    ↓
    POST /api/auth/login
    { email, password }
    ↓
Backend (Spring Boot)
    ↓
    Valide credentials
    Génère JWT
    ↓
    Retourne: { token, user }
    ↓
Frontend (React)
    ↓
    Stocke token en localStorage
    Ajoute Authorization: Bearer {token} aux requêtes
    ↓
Backend (Spring Boot)
    ↓
    Validé le JWT dans chaque requête
    Authentifie l'utilisateur
```

---

## 🎯 Points de Contrôle Finals

- [ ] PostgreSQL s'exécute sur localhost:5432
- [ ] Base de données `GestionVisite` créée
- [ ] Backend démarre sans erreur sur localhost:8080
- [ ] CORS configuré pour `http://localhost:5173`
- [ ] JWT bien généré et validé
- [ ] Frontend démarre sur localhost:5173
- [ ] Endpoint `/auth/login` répond correctement
- [ ] Token JWT stocké en localStorage après login
