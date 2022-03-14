## Pre-Requisites

1. Docker up and running
2. NodeJS installed

## Run the application

`npm install` followed by `npm start`

Post running:

1. Mongo DB exposed at localhost:27017
2. Backend exposed at localhost:3000

Endpoints available:

1. POST /user/register
2. POST /user/login
3. GET /show (query parameter "city" and "movie")
4. POST /show/book

Example calls are in src/e2e.http
e2e.http can be run using the VS Code extension Rest Client.
