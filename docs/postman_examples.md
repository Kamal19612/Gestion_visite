# Postman / curl examples for GestionVisite API

Below are sample curl commands you can use to test the main flows (create visite, checkin, checkout, fetch visite). Adjust host/port if your app runs on a different address.

Base URL: http://localhost:8080

- Create a Visite (POST /api/v1/visites)

curl -i -X POST http://localhost:8080/api/v1/visites \
  -H "Content-Type: application/json" \
  -d '{"date":"29-11-2025","HEntree":"09:00","motif":"Réunion client"}'

Expected:
- HTTP/1.1 201 Created
- Header `Location: /api/v1/visites/{id}` present
- JSON body contains the created resource with `id`.

- Check-in a Visite (POST /api/v1/visites/{id}/checkin)

curl -i -X POST http://localhost:8080/api/v1/visites/{id}/checkin

Expected: HTTP 200 with visite JSON where `HEntree` is set.

- Check-out a Visite (POST /api/v1/visites/{id}/checkout)

curl -i -X POST http://localhost:8080/api/v1/visites/{id}/checkout

Expected: HTTP 200 with visite JSON where `HSortie` is set.

- Get a Visite (GET /api/v1/visites/{id})

curl -i http://localhost:8080/api/v1/visites/{id}

Notes:
- The test suite included in `src/test` uses an in-memory H2 database (profile `test`) with `spring.jpa.hibernate.ddl-auto=create-drop` so it won't affect your production DB.
- If you run the app normally, ensure your configured datasource is available and migrations (if any) are applied before invoking these endpoints.
