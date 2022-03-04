## Refcode - Health Information Toolkit demo app

This project was created to be used as demonstration for a Refcode project.
The user inputs an array of files (videos links in this case) and another language, and the application replies with links for the videos translated for the target language.

The API uses mongodb as a database and JWT for user authentication.

## ENV file
Create an .env at the project root with the following:
* PORT = 5000
* JWT_SECRET = your JWT secret key
* MONGO_URI = your mongodb connection string
* NODE_ENV = development

## Endpoints

#### POST: localhost:5000/api/user/

Submits name, email and password to create an user.

Expected response:
status(201) Created
```
{
    "_id": "62224726234ac501a0e1d430",
    "name": "Test User",
    "email": "user@test.com",
    "password": "$2a$10$Et8czpdTpowz2uuIS3V.u..lpFrPe2yuenEZd4pQKTUR7jnwaHlqG"
}
```

#### GET: localhost:5000/api/user/
* Requires "Bearer token"

Gets current user information.

Expected response:
status(200) Ok
```
{
    "id": "62224726234ac501a0e1d430",
    "name": "Test User",
    "email": "user@test.com"
}
```

#### POST: localhost:5000/api/user/login

Submits email and password to log in an user.

Expected response:
status(200) Ok
```
{
    "_id": "621c1175d24905c6c2d62e39",
    "name": "user one",
    "email": "one@test.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWMxMTc1ZDI0OTA1YzZjMmQ2MmUzOSIsImlhdCI6MTY0NjQxMTgyOCwiZXhwIjoxNjQ5MDAzODI4fQ.53cUHFRL6rT3T1iq1pdXb0EUOci9g50rp68nCnlugAk"
}
```


#### POST: localhost:5000/api/user/submit
* Requires "Bearer token"

Submits an array of videos and the language desired.

Expected response:
status(201) Created
```
{
    "videos": [
        "video1.pt.mp4",
        "video2.pt.mp4",
        "video3.pt.mp4",
        "video4.pt.mp4"
    ],
    "uuid": "fa1d2dfa-3323-476a-a13e-96dc37af0f42",
    "lang": "pt"
}
```

#### GET: localhost:5000/api/patient/:id
* requires a valid as params

Gets an array of videos and language.

Expected response:
status(200) Ok
```
{
    "videos": [
        "video1.pt.mp4",
        "video2.pt.mp4",
        "video3.pt.mp4",
        "video4.pt.mp4"
    ],
    "lang": "pt"
}
```