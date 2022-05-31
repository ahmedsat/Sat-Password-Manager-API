# Sat Password Manager API

this is a simple api for storing encrypted passwords in a database and retrieving them.

## Installation

- clone the repository

- install the dependencies using `npm install`
- set the environment variable `MONGO_URI` to the path of the database
- set the environment variable `JWT_SECRET` for the jwt secret key
- set the environment variable `AES_KEY` for the AES key
- set the environment variable `PORT` for the port if you want to change it from the default which is `5000`
- run `npm start`
  
## Usage

### authenticate routs

- `POST /api/v1/auth/login`
  - expects a json `body` with the following fields:
    - `name`
    - `email`
    - `password`
  - returns a json `body` with the following fields:
    - `token`
    - `user`
- `POST /api/v1/auth/register`
  - expects a json `body` with the following fields:
    - `email`
    - `password`
  - returns  `header` with the following fields:
    - `token`
  - returns a json `body` with the following fields:
    - `user`
- `GET /api/v1/auth/me`
  - expects a `header` with the following fields:
    - `token`
  - returns a json `body` with the following fields:
    - `user`

### password routs

- `POST /api/v1/passwords`
  - expects a `header` with the following fields:
    - `token`
  - expects a json `body` with the following fields:
    - `name`
    - `url`
    - `username`
    - `password`
  - returns a json `body` with the following fields:
    - `password` : the password object
- `GET /api/v1/passwords`
  - expects a `header` with the following fields:
    - `token`
  - returns a json `body` with the following fields:
    - `passwords` : an array of password objects
- `GET /api/v1/passwords/:id`
  - expects a `header` with the following fields:
    - `token`
  - returns a json `body` with the following fields:
    - `password` : the password object
- `PAtCH /api/v1/passwords/:id`
  - expects a `header` with the following fields:
    - `token`
  - expects a json `body` with the following fields:
    - `name`
    - `url`
    - `username`
    - `password`
  - returns a json `body` with the following fields:
    - `password` : the password object
- `DELETE /api/v1/passwords/:id`
  - expects a `header` with the following fields:
    - `token`
  - returns a json `body` with the following fields:
    - `password` : the password object

## Dependencies

### http and project core dependencies

- [dotenv](https://www.npmjs.com/package/dotenv) : the environment variables
- [express](https://expressjs.com/) : the server
- [xpress-async-errors](https://www.npmjs.com/package/xpress-async-errors) : the error handling
- [http-status-codes](https://www.npmjs.com/package/http-status-codes) : the http status codes
- [mongoose](https://mongoosejs.com/) : the database
- [cors](https://www.npmjs.com/package/cors) : cross origin resource sharing

### security and encryption dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt) : the password encryption
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) : the jwt
- [crypto-js](https://www.npmjs.com/package/crypto-js) : the AES encryption

### extra security dependencies

- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) : the rate limiting
- [helmet](https://www.npmjs.com/package/helmet) : extra security layers
- [xss-clean](https://www.npmjs.com/package/xss-clean) : the xss filter
