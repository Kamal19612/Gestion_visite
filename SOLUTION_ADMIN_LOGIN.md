# Solution - Problème de Connexion Admin

## 🔴 PROBLÈMES IDENTIFIÉS

### 1. **Discriminator incorrect dans la migration SQL**
- La migration SQL créait un admin avec `type_users = 'Admin'` (majuscule A, minuscules)
- L'entité `Admin` utilise `@DiscriminatorValue("ADMIN")` (tout en majuscules)
- Cela causait une incohérence dans la base de données

### 2. **Création d'un User au lieu d'un Admin**
- Le `CommandLineRunner` créait un `User` simple avec le rôle ADMIN
- Il devrait créer une instance de `Admin` pour que le discriminator soit correct

### 3. **Mot de passe hashé incorrect**
- La migration SQL avait un hash BCrypt pour "password"
- Mais le CommandLineRunner utilisait un autre mot de passe
- Incohérence entre les deux méthodes de création

---

## ✅ SOLUTIONS APPLIQUÉES

### 1. **Correction du CommandLineRunner** (`GestionVisiteApplication.java`)

**Avant** :
```java
User u = new User();
u.setRole(Roles.ADMIN);
```

**Après** :
```java
Admin admin = Admin.builder()
    .name("Admin User")
    .email("admin@example.com")
    .password(passwordEncoder.encode("admin123"))
    .role(Roles.ADMIN)
    .emailVerified(true)
    .privileges("ALL")
    .build();
adminRepository.save(admin);
```

**Changements** :
- ✅ Crée maintenant une instance de `Admin` au lieu de `User`
- ✅ Utilise `adminRepository` pour garantir le bon discriminator
- ✅ Définit `emailVerified = true` pour éviter les problèmes de vérification
- ✅ Ajoute les privilèges par défaut

### 2. **Suppression de l'insertion SQL**
- ✅ Supprimé l'INSERT dans la migration SQL
- ✅ La création de l'admin est maintenant gérée uniquement par le CommandLineRunner
- ✅ Cela garantit la cohérence et le bon hashage du mot de passe

---

## 📋 INFORMATIONS DE CONNEXION ADMIN

**Email** : `admin@example.com`  
**Password** : `admin123`

Ces informations sont affichées dans la console au démarrage de l'application si l'admin n'existe pas encore.

---

## 🧪 TESTS À EFFECTUER

### Test 1 : Vérifier la création de l'admin
1. Démarrer l'application
2. Vérifier les logs de la console
3. Devrait afficher : "ADMIN PAR DÉFAUT CRÉÉ AVEC SUCCÈS !"

### Test 2 : Connexion avec les identifiants
1. Aller sur `/auth/login`
2. Entrer :
   - Email: `admin@example.com`
   - Password: `admin123`
3. Cliquer sur "Se connecter"
4. ✅ Devrait fonctionner maintenant

### Test 3 : Vérifier le rôle dans le token JWT
1. Après connexion, vérifier le token JWT retourné
2. Décoder le token (sur jwt.io par exemple)
3. Vérifier que le claim `role` contient `ADMIN`

### Test 4 : Vérifier l'accès aux routes admin
1. Après connexion, essayer d'accéder à `/admin/dashboard`
2. ✅ Devrait être autorisé

---

## 🔍 VÉRIFICATIONS SUPPLÉMENTAIRES

Si la connexion ne fonctionne toujours pas, vérifier :

1. **Base de données** :
   ```sql
   SELECT email, role, type_users, email_verified FROM users WHERE email = 'admin@example.com';
   ```
   - `role` devrait être `ADMIN`
   - `type_users` devrait être `ADMIN` (pas `Admin` ou `USER`)
   - `email_verified` devrait être `true`

2. **Logs de l'application** :
   - Vérifier s'il y a des erreurs au démarrage
   - Vérifier si l'admin est créé correctement

3. **Mot de passe** :
   - Si vous avez modifié le mot de passe dans le code, utiliser celui que vous avez défini
   - Le hash BCrypt est généré dynamiquement, donc chaque démarrage créera un hash différent mais valide

---

## ⚠️ NOTES IMPORTANTES

1. **Si l'admin existe déjà** : Le CommandLineRunner ne le recréera pas. Si vous avez un admin avec le mauvais discriminator, vous devrez le supprimer manuellement ou corriger la base de données.

2. **Changement de mot de passe** : Si vous voulez changer le mot de passe par défaut, modifiez-le dans `GestionVisiteApplication.java` ligne 35.

3. **Migration existante** : Si vous avez déjà une base de données avec un admin créé par la migration SQL, vous devrez peut-être :
   - Supprimer l'admin existant
   - Redémarrer l'application pour que le CommandLineRunner le recrée
   - OU corriger manuellement le discriminator dans la base de données

---

## 🛠️ COMMANDE SQL POUR CORRIGER UN ADMIN EXISTANT

Si vous avez déjà un admin avec le mauvais discriminator :

```sql
-- Vérifier l'admin actuel
SELECT id, email, role, type_users, email_verified FROM users WHERE email = 'admin@example.com';

-- Supprimer l'admin existant (si nécessaire)
DELETE FROM users WHERE email = 'admin@example.com';

-- Redémarrer l'application pour que le CommandLineRunner recrée l'admin correctement
```

OU corriger directement :

```sql
UPDATE users 
SET type_users = 'ADMIN', 
    email_verified = true,
    role = 'ADMIN'
WHERE email = 'admin@example.com';
```

---

## ✅ RÉSULTAT ATTENDU

Après ces corrections, vous devriez pouvoir :
- ✅ Vous connecter avec `admin@example.com` / `admin123`
- ✅ Recevoir un token JWT avec le rôle `ADMIN`
- ✅ Accéder aux routes admin
- ✅ Voir l'admin correctement dans la base de données avec `type_users = 'ADMIN'`


