## Refcode - Health Information Toolkit demo app

This is an API built in NodeJS that accepts an array of videos and a language, and responds
with an array of videos of the target language.

The API uses mongodb as a database and JWT for user authentication.

## Requirements
* Node
* npm
* MongoDB

## To run the API

```git clone git@github.com:viniciuspietscher/demo-refcode.git```

* Set a .env file on the project root with the following:
* PORT = 5000
* JWT_SECRET = your JWT secret key
* MONGO_URI = your mongodb connection string

```npm install```

```npm run server```
