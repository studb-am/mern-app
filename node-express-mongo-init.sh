cd BE-docker
docker-compose up -d
docker exec node-server npm install
docker exec node-server node app.js
