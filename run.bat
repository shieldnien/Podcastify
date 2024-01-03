@echo off
echo Arrancando el back-end...
cd ./db-posts/
start node server.js
echo Arrancando el cliente (DEVMODE)...
cd ../podcastify/ 
start npm run dev

