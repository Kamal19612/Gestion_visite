#!/bin/bash
# Script de diagnostic - Tester la communication Frontend-Backend

echo "========================================="
echo "🔍 Diagnostic Frontend-Backend"
echo "========================================="
echo ""

# Vérifier que le backend écoute
echo "1️⃣ Vérification du backend sur port 8080..."
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:8080/api/auth/me

echo ""
echo "2️⃣ Test d'enregistrement (payload invalide - attendu: 400)..."
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "whatsapp": null
  }' \
  -s | jq '.'

echo ""
echo "3️⃣ Frontend sur port 5173..."
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:5173/

echo ""
echo "========================================="
echo "✅ Diagnostic terminé"
echo "========================================="
