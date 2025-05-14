## Steps:

### Classic way
 - Run the contained holding the DB (MySQL) using: `docker compose up`
 - Run the microservice using: `npm run start:dev`
 - Microservice is now ready to receive events through Kafka.

### Docker
Made easy with docker compose, run: `docker compose up` for running all services at once.
- phpmyadmin for testing the db will run under port 8080
    ```
        user: root
        pwd: root
    ```
- The plants service will listen through port 4000
- mysql db running under port: 3306

#### Devlopment environment:
`docker compose --profile dev up` to launch the services in dev mode (launches the microservice too)
