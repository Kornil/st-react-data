[![Greenkeeper badge](https://badges.greenkeeper.io/Kornil/simple-ts-react-app.svg)](https://greenkeeper.io/)
[![codecov](https://codecov.io/gh/Kornil/st-react-data/branch/master/graph/badge.svg)](https://codecov.io/gh/Kornil/st-react-data)
[![Build Status](https://travis-ci.org/Kornil/st-react-data.svg?branch=master)](https://travis-ci.org/Kornil/st-react-data)

Node version required: 8

The project is a full stack Server Side Rendering application written using typescript, express and react.



### How to run

`npm install`

Both back end and front end are hot reloaded.
The first time I'd suggest to run `npm run build` just to generate an initial `<root>server.js` file.
Since hot reload works in parallel with rebuilding assets, it will otherwise complain the first time not finding the file.

After this the project can be run by simply using `npm run start--dev`.



## Commands and their descriptions

- `npm run test` runs all tests and generate coverage report. Tests use jest on both frontend and backend.

- `npm run type-check` since typescript is integrated thru `@babel7`, it won't stop a missing type from running the code, so type checking can be run manually. (Travis runs it automatically).

- `npm run tslint` lints the project using typescript tslint config.

- `npm run start--dev` runs the hot reloaded project.

- `npm start` starts the project (intended for production only!)

- `npm run build` builds the production bundle.



## Additional info

- [Travis information can be found here](https://travis-ci.org/Kornil/st-react-data)

- [Codecov report](https://codecov.io/gh/Kornil/st-react-data)



## Technologies used

Global:
- Typescript
- Webpack
- Babel
- Travis
- Codecov
- Jest
- Git

Backend:
- Express
- Supertest (testing)
- React SSR

Front-end
- React
- React-router
- Scss
- Formidable/victory
- Enzyme (testing)
