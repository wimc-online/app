# APP for "Where is my courier?"
![Publish Docker image](https://github.com/wimc-online/app/workflows/Publish%20Docker%20image/badge.svg)

## Development
```shell script
npm install
ionic serve
```

## Locally built Docker image
```shell script
# check if docker is installed
command -v docker
# build docker image
docker build -t docker.pkg.github.com/wimc-online/app/app:latest .
```

## Prepare environment variables
```shell script
cp .env.dev.dist .env
```
