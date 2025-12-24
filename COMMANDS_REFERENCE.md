# ⌨️ Commandes Pratiques - Quick Reference

## 🚀 Démarrage Rapide

### Terminal 1: Backend
```bash
cd d:\Gestion_visite
mvn spring-boot:run
```

### Terminal 2: Frontend
```bash
cd d:\Gestion_visite\frontend
npm install  # Première fois seulement
npm run dev
```

### Navigateur
```
http://localhost:5173/auth/register
```

---

## 📦 Installation Initiale

### Backend (Maven)
```bash
# Vérifier Maven est installé
mvn --version

# Compiler
mvn clean compile

# Tester
mvn test

# Démarrer
mvn spring-boot:run
```

### Frontend (Node.js)
```bash
# Vérifier Node est installé
node --version
npm --version

# Installer les dépendances
npm install

# Démarrer le serveur de dev
npm run dev

# Compiler pour production
npm run build

# Afficher un aperçu de la production
npm run preview
```

---

## 🧪 Tests

### Tests Backend
```bash
cd d:\Gestion_visite

# Exécuter tous les tests
mvn test

# Exécuter un test spécifique
mvn test -Dtest=AuthControllerTest
```

### Tests Frontend (Vite)
```bash
cd d:\Gestion_visite\frontend

# Vérifier les erreurs ESLint
npm run lint
```

---

## 🔍 Debug & Inspection

### Backend - Logs
```bash
# En console (déjà en exécution)
# Cherchez les lignes avec:
# [INFO] User registered
# [ERROR] Invalid credentials
# [WARN] Email service not configured
```

### Frontend - Console Browser
```javascript
// Vérifier le token
localStorage.getItem('token')

// Vérifier l'utilisateur
JSON.parse(localStorage.getItem('user'))

// Vérifier l'API URL
import.meta.env.VITE_API_BASE
```

### Network Inspector (F12)
```
1. Ouvrez F12
2. Onglet "Network"
3. Effectuez une action (login, register)
4. Vérifiez que la requête va à http://localhost:8080/api
5. Vérifiez la réponse JSON
```

---

## 🗄️ Base de Données

### PostgreSQL - Connexion
```bash
# Avec psql (si installé)
psql -h localhost -U postgres -d GestionVisite

# Ou avec DBeaver/PgAdmin
# Serveur: localhost
# Port: 5432
# Username: postgres
# Password: 196120
```

### Requêtes Utiles
```sql
-- Voir les utilisateurs
SELECT * FROM "user";

-- Voir les utilisateurs vérifiés
SELECT * FROM "user" WHERE email_verified = true;

-- Compter les utilisateurs
SELECT COUNT(*) FROM "user";

-- Voir les rôles
SELECT DISTINCT role FROM "user";
```

---

## 🔧 Configuration & Environment

### Fichiers Clés
```bash
# Frontend
.env.local                          # Variables d'env (créer si absent)
frontend/package.json               # Dépendances
vite.config.js                      # Configuration Vite
tailwind.config.cjs                 # Configuration Tailwind

# Backend
src/main/resources/application.properties  # Configuration Spring
src/main/java/.../configuration/CorsConfig.java
```

### Éditer les Variables d'Env
```bash
# Frontend
echo "VITE_API_BASE=http://localhost:8080/api" > .env.local

# Ou manuellement:
# Ouvrir .env.local et modifier
```

---

## 📊 Serveurs Status

### Vérifier les Ports
```bash
# Windows PowerShell
# Vérifier que 5173 est libre
netstat -ano | findstr :5173

# Vérifier que 8080 est libre
netstat -ano | findstr :8080

# Vérifier que 5432 est libre (PostgreSQL)
netstat -ano | findstr :5432
```

### Tuer un Processus (si bloqué)
```bash
# Trouver le PID
netstat -ano | findstr :5173

# Tuer le processus (remplacer PID)
taskkill /PID 12345 /F
```

---

## 🧹 Nettoyage & Maintenance

### Frontend
```bash
cd frontend

# Nettoyer node_modules et réinstaller
rm -r node_modules
npm install

# Nettoyer le cache Vite
rm -r node_modules/.vite

# Nettoyer la build
rm -r dist
```

### Backend
```bash
cd d:\Gestion_visite

# Nettoyer les builds Maven
mvn clean

# Nettoyer et recompiler
mvn clean compile

# Réinitialiser le cache
mvn clean install
```

---

## 🔐 Sécurité & Production

### Frontend Build
```bash
cd frontend

# Build production
npm run build

# Résultat dans: dist/

# Servir le build localement
npm run preview
```

### Backend Build
```bash
cd d:\Gestion_visite

# Build JAR
mvn clean package

# JAR créé dans: target/gestionvisite-0.0.1-SNAPSHOT.jar

# Exécuter le JAR
java -jar target/gestionvisite-0.0.1-SNAPSHOT.jar
```

---

## 📝 Édition Rapide des Fichiers

### Ouvrir les fichiers clés
```bash
# Frontend
code frontend/src/services/api.js
code frontend/.env.local
code frontend/src/hooks/useAuth.jsx

# Backend
code src/main/java/com/NativIA/GestionVisite/controllers/AuthController.java
code src/main/resources/application.properties
```

---

## 🐛 Troubleshooting Rapide

### Les styles n'apparaissent pas
```bash
# Frontend - Redémarrer
npm run dev
```

### "Cannot connect to database"
```bash
# Vérifier PostgreSQL
net start postgresql-x64-15  # ou votre version

# Vérifier la connexion
psql -h localhost -U postgres
```

### "CORS error"
```bash
# Vérifier que le backend s'exécute
http://localhost:8080

# Vérifier .env.local
cat frontend/.env.local | findstr VITE_API_BASE
```

### "401 Unauthorized"
```bash
# Vérifier le token en localStorage
# Dans F12 Console:
localStorage.getItem('token')

# Si vide, l'utilisateur n'est pas connecté
```

---

## 📚 Fichiers de Logs

### Backend Logs
```
Fichier: target/logs/application.log (si configuré)
Console: Vérifiez le terminal en exécution
```

### Frontend Logs
```
Console: F12 > Console (erreurs/warnings)
Network: F12 > Network (requêtes API)
```

---

## 🔄 Git (Optionnel)

### Initialiser un repo
```bash
git init
git add .
git commit -m "Initial integration complete"
git branch -M main
git remote add origin https://votre-repo.git
git push -u origin main
```

### Push des modifications
```bash
git status
git add .
git commit -m "Description des changements"
git push
```

---

## 📊 Vérifications Finales

### Avant de Commencer
```bash
# Vérifier les versions
java -version           # Java 11+
mvn -version           # Maven 3.6+
node --version         # Node 16+
npm --version          # NPM 7+
```

### Avant de Déployer
```bash
# Frontend
npm run build
# Vérifier que dist/ est créé sans erreurs

# Backend
mvn clean package
# Vérifier que target/*.jar est créé
```

---

## 🎯 Commandes par Situation

### "Je veux tout recommencer"
```bash
# Frontend
cd frontend
rm -r node_modules
npm install
npm run dev

# Backend (dans un autre terminal)
cd d:\Gestion_visite
mvn clean spring-boot:run
```

### "J'ai une erreur cryptique"
```bash
# Vérifiez les logs
# Frontend: F12 Console
# Backend: Terminal en exécution

# Redémarrez les deux
# Terminal 1: Ctrl+C, puis npm run dev
# Terminal 2: Ctrl+C, puis mvn spring-boot:run
```

### "Rien ne fonctionne"
```bash
# Redémarrage complet
# 1. Fermer tous les terminaux
# 2. Fermer le navigateur
# 3. Vérifier que les ports sont libres
# 4. Relancer:

npm run dev          # Terminal 1: Frontend
mvn spring-boot:run  # Terminal 2: Backend

# 5. Ouvrir http://localhost:5173 dans le navigateur
```

---

## 💡 Tips & Tricks

### Alias Utiles (PowerShell)
```powershell
# Ajouter à votre profil PowerShell
function Start-Frontend { cd frontend; npm run dev }
function Start-Backend { mvn spring-boot:run }
function Start-Both { 
    Start-Frontend &
    Start-Backend &
}
```

### Dual Monitor Setup
```
Moniteur 1: Terminal Backend
Moniteur 2: Terminal Frontend + Navigateur
```

### Test Rapide d'API
```bash
# Avec curl (dans PowerShell)
curl http://localhost:8080/api/auth/me

# Ou utiliser Postman/Insomnia
```

---

## 📞 Commandes d'Aide

```bash
# Frontend Help
npm run        # Voir tous les scripts disponibles

# Backend Help
mvn help:active-profiles
mvn help:describe -Dplugin=org.springframework.boot:spring-boot-maven-plugin
```

---

**Version:** 1.0  
**Dernière mise à jour:** 24/12/2025
