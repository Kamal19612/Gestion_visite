# Exemples de Requêtes Postman / cURL pour l'API GestionVisite

Voici des exemples de requêtes que vous pouvez utiliser pour tester les points d'accès (endpoints) de votre API. La base de l'URL est assumée être `http://localhost:8080`.

---

### 1. Gestion des Visiteurs

#### Créer un nouveau visiteur
* **POST** `/api/v1/visiteurs`
* **Body (application/json):**
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123",
    "role": "VISITEUR",
    "entreprise": "Example Corp",
    "scanDocumentPath": "/docs/john_doe_id.pdf",
    "signaturePath": "/docs/john_doe_signature.png"
}
```
* **Commande cURL:**
```shell
curl -X POST http://localhost:8080/api/v1/visiteurs \
-H "Content-Type: application/json" \
-d '{ "name": "John Doe", "email": "john.doe@example.com", "password": "securepassword123", "role": "VISITEUR", "entreprise": "Example Corp", "scanDocumentPath": "/docs/john_doe_id.pdf", "signaturePath": "/docs/john_doe_signature.png" }'
```

---


### 2. Gestion des Rendez-vous

#### Créer un nouveau rendez-vous
* **POST** `/api/v1/rendezvous`
* **Body (application/json):**
```json
{
    "date": "2025-12-10",
    "heure": "14:30:00",
    "type": "PLANIFIE",
    "statut": true,
    "code": "RDV-UNIQUE-CODE-123"
}
```
* **Commande cURL:**
```shell
curl -X POST http://localhost:8080/api/v1/rendezvous \
-H "Content-Type: application/json" \
-d '{ "date": "2025-12-10", "heure": "14:30:00", "type": "PLANIFIE", "statut": true, "code": "RDV-UNIQUE-CODE-123" }'
```

---


### 3. Gestion des Visites

#### Créer une nouvelle visite
* **POST** `/api/v1/visites`
* **Body (application/json):**
```json
{
    "date": "2025-12-10T14:30:00",
    "hEntree": null,
    "hSortie": null,
    "motif": "Réunion de projet",
    "statut": "PLANIFIEE"
}
```
* **Commande cURL:**
```shell
curl -X POST http://localhost:8080/api/v1/visites \
-H "Content-Type: application/json" \
-d '{ "date": "2025-12-10T14:30:00", "motif": "Réunion de projet", "statut": "PLANIFIEE" }'
```

#### Enregistrer une entrée (Check-in)
* **POST** `/api/v1/visites/{id}/checkin`
* **Note:** Remplacez `{id}` par l'ID de la visite.
* **Commande cURL:**
```shell
curl -X POST http://localhost:8080/api/v1/visites/1/checkin
```

#### Enregistrer une sortie (Check-out)
* **POST** `/api/v1/visites/{id}/checkout`
* **Note:** Remplacez `{id}` par l'ID de la visite.
* **Commande cURL:**
```shell
curl -X POST http://localhost:8080/api/v1/visites/1/checkout
```

---


### 4. Gestion des Agents de Sécurité

#### Créer un nouvel agent
* **POST** `/api/v1/agents`
* **Body (application/json):**
```json
{
    "name": "Agent Smith",
    "email": "agent.smith@securite.com",
    "password": "matrixpassword",
    "role": "AGENT_SECURITE",
    "matricule": "MAT-734"
}
```
* **Commande cURL:**
```shell
curl -X POST http://localhost:8080/api/v1/agents \
-H "Content-Type: application/json" \
-d '{ "name": "Agent Smith", "email": "agent.smith@securite.com", "password": "matrixpassword", "role": "AGENT_SECURITE", "matricule": "MAT-734" }'
```

---


### 5. Soumission de demande de RDV (par un visiteur externe)

#### Créer une nouvelle soumission
* **POST** `/api/v1/soumissions`
* **Body (application/json):**
```json
{
    "nom": "Jane",
    "prenom": "Doe",
    "departement": "Ressources Humaines",
    "email": "jane.doe@visiteur.com",
    "telephone": "0123456789",
    "entreprise": "Visiteur Corp",
    "motif": "Entretien d'embauche",
    "dateRendezVous": "2025-12-15",
    "heureRendezVous": "10:00:00"
}
```
* **Commande cURL:**
```shell
curl -X POST http://localhost:8080/api/v1/soumissions \
-H "Content-Type: application/json" \
-d '{ "nom": "Jane", "prenom": "Doe", "departement": "Ressources Humaines", "email": "jane.doe@visiteur.com", "telephone": "0123456789", "entreprise": "Visiteur Corp", "motif": "Entretien d'embauche", "dateRendezVous": "2025-12-15", "heureRendezVous": "10:00:00" }'
```