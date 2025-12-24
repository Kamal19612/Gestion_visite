# ⚡ Quick Start - Intégration Complète

## 📋 Prérequis (5 minutes)

### Backend
```bash
# 1. Vérifier PostgreSQL
# La base de données doit être accessible sur localhost:5432

# 2. Démarrer le backend
cd d:\Gestion_visite
mvn spring-boot:run

# Attend: "Started GestionVisiteApplication in X seconds"
# Port: http://localhost:8080
```

### Frontend
```bash
# 3. Vérifier les fichiers de config
# Vérifiez que .env.local existe avec:
# VITE_API_BASE=http://localhost:8080/api

# 4. Installer les dépendances
cd d:\Gestion_visite\frontend
npm install

# 5. Démarrer le serveur de dev
npm run dev

# Attend: "Local: http://localhost:5173"
```

---

## 🧪 Test en 60 Secondes

### 1. Ouvrir le navigateur
```
http://localhost:5173/auth/register
```

### 2. S'inscrire
```
Prénom: Test
Nom: User
Email: test@example.com
Mot de passe: Test1234
Confirmer: Test1234

→ Cliquez "S'inscrire"
```

### 3. Vérifier l'email
```
Allez dans la console backend et cherchez: "Verification code sent"
Ou recevez un email avec le code

Code: 123456 (ou celui reçu)

→ Cliquez "Vérifier"
```

### 4. Se connecter
```
Email: test@example.com
Mot de passe: Test1234

→ Cliquez "Se connecter"
```

### 5. Succès ✅
```
Redirection vers: http://localhost:5173/visitor
Vous voyez le tableau de bord visiteur
```

---

## 🎨 Styles Visibles ?

Si les styles **n'apparaissent pas** (page blanche):

```bash
# Redémarrez le frontend
npm run dev
```

Les styles Tailwind devraient maintenant apparaître. ✅

---

## 📊 Points de Contrôle

### Backend
- [x] Spring Boot s'exécute
- [x] CORS configuré
- [x] JWT implémenté
- [x] Endpoints d'authentification prêts
- [x] Base de données PostgreSQL

### Frontend
- [x] `.env.local` configuré
- [x] Services API implémentés
- [x] Pages d'authentification créées
- [x] Styles Tailwind activés
- [x] Routes protégées configurées

---

## 🔑 Points d'Intégration Clés

| Composant | Fichier | Statut |
|-----------|---------|--------|
| API Configuration | `.env.local` | ✅ |
| Service API | `src/services/api.js` | ✅ |
| Service Auth | `src/services/authService.js` | ✅ |
| Login Page | `src/pages/auth/Login.jsx` | ✅ |
| Register Page | `src/pages/auth/Register.jsx` | ✅ |
| Verify Email | `src/pages/auth/VerifyEmail.jsx` | ✅ |
| Auth Context | `src/hooks/useAuth.jsx` | ✅ |
| Routes | `src/AppRoutes.jsx` | ✅ |
| Styles | `src/index.css` + `postcss.config.cjs` | ✅ |

---

## 🚨 Troubleshooting Rapide

**Page blanche ?**
```bash
npm run dev
# Les styles Tailwind doivent apparaître
```

**"Cannot connect to API" ?**
```bash
# Vérifiez que le backend s'exécute
http://localhost:8080/api/auth/me

# Vérifiez .env.local
VITE_API_BASE=http://localhost:8080/api
```

**"Invalid credentials" ?**
```bash
# Vérifiez la base de données
# Assurez-vous que l'utilisateur existe et est vérifié
```

**"Email not found" ?**
```bash
# Vérifiez la console backend pour le code
# Ou cherchez l'email configuré dans application.properties
```

---

## 📚 Documentation Complète

Pour plus de détails:
- **Configuration:** `frontend/INTEGRATION_CONFIG.md`
- **Tests:** `frontend/TEST_GUIDE.md`
- **Modifications:** `frontend/MODIFICATIONS_SUMMARY.md`
- **Backend:** `BACKEND_CHECKLIST.md`

---

## 🎯 Prochaines Étapes

1. ✅ **Authentification** - Connexion/Inscription terminée
2. ⏳ **Ajouter le formulaire de rendez-vous** - Pour les visiteurs
3. ⏳ **Tableau de bord secrétaire** - Gestion des rendez-vous
4. ⏳ **Tableau de bord agent** - Enregistrement des visites
5. ⏳ **Tableau de bord admin** - Statistiques et paramètres

---

## 🎉 C'est Prêt!

Votre système d'authentification est maintenant **entièrement intégré**. Vous pouvez:

✅ S'inscrire avec email
✅ Vérifier l'adresse email
✅ Se connecter
✅ Accéder aux pages protégées selon le rôle
✅ Voir les styles Tailwind

Bonne chance! 🚀
