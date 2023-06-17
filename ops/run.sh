#!/bin/bash

echo "Lancement du docker-compose pour le proxy..."
docker compose -f docker-compose-proxy.yml build
docker compose -f docker-compose-proxy.yml up
