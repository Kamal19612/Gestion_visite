# 🚀 Instructions de Démarrage - Étapes Visuelles

## Phase 1: Préparation (2 minutes)

### ✅ Vérifier PostgreSQL
```
Windows → Services → PostgreSQL
Ou
Task Manager → Services → postgresql-x64-XX
```
Status: **En cours d'exécution** ✅

### ✅ Ouvrir 2 Terminaux
- Terminal 1: Backend (Spring Boot)
- Terminal 2: Frontend (Node.js)

---

## Phase 2: Démarrer le Backend (30 secondes)

### Terminal 1: Backend
```bash
cd d:\Gestion_visite

mvn spring-boot:run
```

**Attendez ce message:**
```
 _            _         _
| |          | |       | |
| | ___  __ _| |_  ___ | |  ___ ____
| |/ _ \/ _` | __|| _ \| | / _ |_ / 
| |  __/ (_| | |_ | | | | / (_|  /
|_|\___|\__,_|\__||_| |_|_|\__/__/

Started GestionVisiteApplication in X.XXX seconds
```

**Port affichera:** `8080` ✅

---

## Phase 3: Démarrer le Frontend (30 secondes)

### Terminal 2: Frontend
```bash
cd d:\Gestion_visite\frontend

npm run dev
```

**Attendez:**
```
  ➜  local:   http://localhost:5173/
  ➜  press h to show help
```

**Port:** `5173` ✅

---

## Phase 4: Tester l'Intégration (2 minutes)

### 1️⃣ Ouvrir le Navigateur
```
Allez à: http://localhost:5173/auth/register
```

**Vous devriez voir:**
- Page blanche avec un formulaire d'inscription
- Champs: Prénom, Nom, Email, Mot de passe, WhatsApp
- Les styles Tailwind devraient être visibles ✅

### 2️⃣ S'Inscrire
```
Prénom:            Jean
Nom:               Dupont
Email:             jean.dupont@test.com
WhatsApp:          (optionnel)
Mot de passe:      Test1234
Confirmer:         Test1234

→ Cliquez "S'inscrire"
```

**Résultat attendu:**
```
✅ Message: "Inscription réussie..."
✅ Redirection vers la page de vérification
```

### 3️⃣ Vérifier l'Email
```
Regardez la console du backend pour le code

Cherchez: "Verification code sent to: jean.dupont@test.com"
Code: [copier le code]

→ Collez le code dans le champ
→ Cliquez "Vérifier"
```

**Résultat attendu:**
```
✅ Message: "Vérification réussie"
✅ Redirection vers la page de connexion
```

### 4️⃣ Se Connecter
```
Email:              jean.dupont@test.com
Mot de passe:       Test1234

→ Cliquez "Se connecter"
```

**Résultat attendu:**
```
✅ Redirection vers: http://localhost:5173/visitor
✅ Tableau de bord visiteur visible
```

---

## 📊 Vérifications de Démarrage

### Backend (Terminal 1)
```
✅ "Started GestionVisiteApplication" visible
✅ "Listening on port 8080"
✅ Pas d'erreurs de base de données
✅ Logs d'authentification visibles
```

### Frontend (Terminal 2)
```
✅ "Local: http://localhost:5173/" visible
✅ Pas d'erreurs TypeScript/ESLint
✅ Pas d'avertissements critiques
```

### Navigateur
```
✅ Page de connexion/inscription visible
✅ Les styles Tailwind apparaissent (couleurs, espacements)
✅ Les formulaires sont interactifs
✅ Les messages d'erreur s'affichent correctement
```

---

## 🔍 Checklist Visuelle

| Étape | Backend | Frontend | Navigateur |
|-------|---------|----------|-----------|
| Démarrage | ✅ | ✅ | ✅ |
| Port correct | 8080 | 5173 | http://localhost:5173 |
| Pas d'erreurs | ✅ | ✅ | ✅ |
| Communication | ✅ | ✅ | ✅ |
| Inscription OK | ✅ | ✅ | ✅ |
| Vérification OK | ✅ | ✅ | ✅ |
| Connexion OK | ✅ | ✅ | ✅ |
| Dashboard visible | ✅ | ✅ | ✅ |

---

## 📍 Positions des Terminaux

```
┌─────────────────────────────────────────────┐
│ Terminal 1 (Backend)                        │
│ Port 8080 - Spring Boot                     │
│ "Started GestionVisiteApplication..."       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Terminal 2 (Frontend)                       │
│ Port 5173 - Vite Dev Server                 │
│ "Local: http://localhost:5173/"             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Navigateur                                  │
│ http://localhost:5173                       │
│ Page d'inscription/connexion                │
└─────────────────────────────────────────────┘
```

---

## ⚠️ Si Ça ne Fonctionne pas

### "Cannot connect to database" - Backend
```
❌ Backend s'arrête immédiatement

Solution:
1. Vérifiez PostgreSQL en cours d'exécution
2. Vérifiez les identifiants dans application.properties
3. Vérifiez la base de données existe
```

### "Styles invisibles" - Frontend
```
❌ Page blanche ou non stylisée

Solution:
1. Arrêtez: Ctrl+C
2. Redémarrez: npm run dev
3. Attendez le rechargement
```

### "CORS Error" - Navigateur
```
❌ Erreur dans la console du navigateur

Solution:
1. Vérifiez le backend s'exécute sur 8080
2. Vérifiez .env.local contient VITE_API_BASE
3. Vérifiez CorsConfig.java accepte 5173
```

### "401 Unauthorized" - Navigateur
```
❌ Les emails/mots de passe ne fonctionnent pas

Solution:
1. Vérifiez l'utilisateur existe dans la DB
2. Vérifiez que l'email a été vérifié
3. Vérifiez le mot de passe correct
```

---

## 🎯 État Final

### ✅ Réussi
```
Backend:  http://localhost:8080  ✅
Frontend: http://localhost:5173  ✅
Auth:     Fully functional       ✅
Styles:   Tailwind visible       ✅
DB:       Connected              ✅
```

### 🎉 Prêt pour Développement
Vous pouvez maintenant:
- ✅ Créer des utilisateurs
- ✅ Voir les tableaux de bord par rôle
- ✅ Ajouter plus de pages
- ✅ Intégrer les autres features

---

## 📞 Support

Si vous avez des problèmes:
1. Vérifiez `QUICK_START.md`
2. Vérifiez `TEST_GUIDE.md`
3. Vérifiez `BACKEND_CHECKLIST.md`
4. Regardez les logs du terminal
5. Consultez la console du navigateur (F12)

---

**Vous êtes prêt! 🚀**
