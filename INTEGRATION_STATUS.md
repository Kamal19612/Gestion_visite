# 📊 Tableau d'Intégration Frontend-Backend

## 🎯 État Global de l'Intégration

| Composant | Frontend | Backend | Intégration | Statut |
|-----------|----------|---------|-------------|--------|
| **Authentification** | ✅ | ✅ | ✅ | 100% |
| **Styles Tailwind** | ✅ | N/A | ✅ | 100% |
| **Gestion Rôles** | ✅ | ✅ | ✅ | 100% |
| **Protection Routes** | ✅ | ✅ | ✅ | 100% |

---

## 📡 Endpoints API

### Authentification (Public)

```
POST /api/auth/register
├─ Request:  { firstName, lastName, email, password, confirmPassword, whatsapp? }
├─ Response: { message, user, requiresVerification }
├─ Status:   201 ou 400
└─ Frontend: Register.jsx

POST /api/auth/login
├─ Request:  { email, password }
├─ Response: { token, user }
├─ Status:   200 ou 401
└─ Frontend: Login.jsx

POST /api/auth/verify-email?email=X&code=Y
├─ Request:  (params: email, code)
├─ Response: { message }
├─ Status:   200 ou 400
└─ Frontend: VerifyEmail.jsx

POST /api/auth/resend-verification?email=X
├─ Request:  (params: email)
├─ Response: { message, code? }
├─ Status:   200 ou 400
└─ Frontend: VerifyEmail.jsx (optionnel)

POST /api/auth/logout
├─ Request:  (Bearer token requis)
├─ Response: { status }
├─ Status:   200
└─ Frontend: useAuth.jsx
```

### Utilisateur (Protégé)

```
GET /api/auth/me
├─ Request:  (Bearer token requis)
├─ Response: { id, email, firstName, lastName, role, ... }
├─ Status:   200 ou 401
└─ Frontend: useAuth.jsx
```

---

## 🔐 Flux d'Authentification

### 1️⃣ Inscription
```
Utilisateur
    ↓
[Register.jsx] ← Formulaire
    ↓
POST /api/auth/register
    ↓
[AuthController.register()]
    ├─ Valide email non utilisé
    ├─ Valide mots de passe
    ├─ Encode password
    ├─ Enregistre User (emailVerified=false)
    ├─ Génère code vérification
    └─ Envoie email (ou affiche en console)
    ↓
Response: { message, user, requiresVerification: true }
    ↓
[VerifyEmail.jsx] ← Code reçu
```

### 2️⃣ Vérification Email
```
Utilisateur entre le code
    ↓
POST /api/auth/verify-email?email=X&code=Y
    ↓
[AuthController.verifyEmail()]
    ├─ Valide le code
    ├─ Met à jour User (emailVerified=true)
    └─ Supprime le code
    ↓
Response: { message: "Email vérifié avec succès" }
    ↓
Redirection → [Login.jsx]
```

### 3️⃣ Connexion
```
Utilisateur entre credentials
    ↓
POST /api/auth/login
    ↓
[AuthController.login()]
    ├─ Cherche User par email
    ├─ Valide password
    ├─ Génère JWT token
    └─ Réinitialise failedLoginAttempts
    ↓
Response: { token, user }
    ↓
[Login.jsx]
    ├─ Stocke token en localStorage
    ├─ Appelle authService.getProfile()
    └─ Redirection vers /visitor
    ↓
[useAuth.jsx]
    └─ Stocke user dans context
    ↓
✅ Utilisateur authentifié
```

### 4️⃣ Requêtes Authentifiées
```
Chaque requête
    ↓
[api.js interceptor]
    ├─ Ajoute Bearer token
    └─ Envoie header: Authorization: Bearer {JWT}
    ↓
Backend [SecurityConfig]
    ├─ Valide le JWT
    ├─ Extracte l'email du token
    └─ Authentifie l'utilisateur
    ↓
✅ Requête exécutée
ou
❌ 401 Unauthorized si token invalide
```

---

## 🔄 État du Contexte Authentification

### Avant Connexion
```javascript
{
  user: null,
  login: function,
  logout: function,
  loading: true/false
}
```

### Après Connexion
```javascript
{
  user: {
    id: 1,
    email: "jean@example.com",
    firstName: "Jean",
    lastName: "Dupont",
    role: "VISITEUR",
    emailVerified: true,
    ...
  },
  login: function,
  logout: function,
  loading: false
}
```

---

## 📦 Stockage Local (localStorage)

### token
```javascript
localStorage.getItem('token')
// Retourne: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### user
```javascript
localStorage.getItem('user')
// Retourne: {"id":1,"email":"jean@example.com",...}
```

---

## 🛡️ Sécurité & Validation

### Frontend
- ✅ Validation des formulaires (React Hook Form)
- ✅ Messages d'erreur clairs
- ✅ Protection des routes par rôle
- ✅ Token stocké de façon sécurisée
- ✅ CORS avec credentials

### Backend
- ✅ Validation des données (Spring Validation)
- ✅ Encodage des passwords (BCrypt)
- ✅ JWT tokens signés
- ✅ Token revocation au logout
- ✅ Protection CSRF désactivée (JWT)
- ✅ Gestion des tentatives échouées

---

## 🎭 Rôles et Permissions

| Rôle | Constant | Pages Accessibles | Permissions |
|------|----------|------------------|-------------|
| **VISITEUR** | 'VISITEUR' | `/visitor`, `/visitor/dashboard`, `/visitor/appointments/new` | Créer RDV |
| **SECRETAIRE** | 'SECRETAIRE' | `/secretary/*` | Gérer RDV |
| **AGENT_SECURITE** | 'AGENT_SECURITE' | `/agent/*` | Enregistrer visites |
| **EMPLOYE** | 'EMPLOYE' | `/employee/*` | Tableau de bord |
| **ADMIN** | 'ADMIN' | `/admin/*` | Tout |

### Implémentation
```javascript
// AppRoutes.jsx
<Route element={<ProtectedRoute allowedRoles={['VISITEUR']} />}>
  <Route path="/visitor" element={<VisitorDashboard />} />
</Route>
```

---

## 📋 Checklist de Déploiement

### Avant Production
- [ ] Configurer la base de données PostgreSQL
- [ ] Générer une clé JWT sécurisée
- [ ] Configurer SMTP pour les emails
- [ ] Configurer CORS avec le domaine réel
- [ ] Tester tous les scénarios d'authentification
- [ ] Tester la sécurité JWT
- [ ] Configurer les logs
- [ ] Configurer HTTPS (SSL/TLS)
- [ ] Tester la sauvegarde des données

### Frontend
- [ ] Build de production: `npm run build`
- [ ] Vérifier que `VITE_API_BASE` pointe vers le bon serveur
- [ ] Minification des assets
- [ ] Tests de performance

### Backend
- [ ] Activer HTTPS
- [ ] Configurer un WAF
- [ ] Configurer les rate limits
- [ ] Activer les logs détaillés
- [ ] Configurer le monitoring

---

## 🚨 Points Critiques de Suivi

### Si l'Auth ne Fonctionne pas

**1. Vérifier la base de données**
```sql
SELECT * FROM "user" WHERE email = 'test@example.com';
-- Doit retourner l'utilisateur enregistré
```

**2. Vérifier le token JWT**
```javascript
// Dans la console
const token = localStorage.getItem('token');
console.log(token); // Doit avoir un token long
```

**3. Vérifier les logs du backend**
```
Le backend doit afficher:
- "User registered successfully"
- "Verification code sent to: email@example.com"
- "User authenticated with JWT"
```

**4. Vérifier la configuration CORS**
```
Headers doivent contenir:
- Access-Control-Allow-Origin: http://localhost:5173
- Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

---

## 📊 Statistiques

- **Endpoints API**: 6 (auth) + N (futures)
- **Pages Frontend**: 7 (3 public + 4 auth)
- **Fichiers Modifiés**: 11
- **Fichiers Créés**: 7 (.env + documentation)
- **Composants React**: 3 (Login, Register, VerifyEmail)
- **Hooks personnalisés**: 1 (useAuth)
- **Services**: 2 (api, authService)

---

## 🎯 Prochaines Étapes d'Intégration

1. **Rendez-vous** - Créer/modifier/lister
2. **Visites** - Enregistrer et valider
3. **Statistiques** - Dashboard admin
4. **Notifications** - WebSockets ou polling
5. **Uploads** - Documents/Signatures
6. **Audit** - Logging des actions

---

## 📚 Fichiers de Référence

| Fichier | But |
|---------|-----|
| `QUICK_START.md` | Démarrage en 60 secondes |
| `INTEGRATION_CONFIG.md` | Configuration détaillée |
| `TEST_GUIDE.md` | Tests manuels |
| `MODIFICATIONS_SUMMARY.md` | Résumé des changements |
| `BACKEND_CHECKLIST.md` | Vérification backend |
| `BACKEND_CONFIG.md` | Configuration backend |

---

**Intégration Frontend-Backend: 100% COMPLÈTE** ✅
