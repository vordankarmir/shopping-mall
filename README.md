## Installation

```bash
$ npm install
```

## Migrate categories data to Mongodb

```
Make sure you have installed mongodb in your local machine.

Change your directory to db/migrations and run

$ mongosh db_name query.js
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

While application is running follow this [link](http://localhost:3001/api) to access documentation with Swagger.

## License

Nest is [MIT licensed](LICENSE).
