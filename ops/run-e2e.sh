#!/bin/bash

echo "Lancement du docker-compose pour les tests E2E..."
docker compose -f docker-compose-e2e.yml up
