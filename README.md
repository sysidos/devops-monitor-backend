# CodeX Dev Ops Board - Backend

## Development Setup
Startup cocker containers
```
docker-compose up
```

Access docker containers
```
docker-compose exec app bash
```

Setup environment variables and adjust the variables according to environment
```
cp .env.example .env
```

Following commands can be run inside the docker container

Install npm packages
```
npm ci
```

Run Node server
```
npm run dev
```

Access web interface via *https://localhost*

## Notes
*app layout forked from https://github.com/dalenguyen/rest-api-node-typescript*
