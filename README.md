# Airline reservation service

Live demo is [available](https://airline-reservation-service.herokuapp.com/) on heroku! You can sign up with your credentials or use the following for demo purposes:
```
email:  test@gmail.com
password: test123
```

Development
---
Check out repository and navigate to it:
```
git clone https://github.com/Kurdiumov/airline-reservation-service.git
cd airline-reservation-service
```
    
Install dependencies using npm:
```
npm run install-all // To install dependencies on both back-end and front-end
```
or
```
npm install // To install only back-end dependencies
npm run install-client // To install only front-end dependencies
```

To start front-end in development mode execute the following commands (Front-end will be available on port 3000):
```
cd client && npm run start
```
To build front-end in production mode execute:
```
cd client && npm run build
```
You can start back-end live server which will watch for any changes (Back-end will be available on port 5000):
```
npm run watch
```

You will also need to create suitable .ENV files with real values for backend and client sides:

Client:
```
REACT_APP_API_URL=
```

Backend:
```
DB_CONNECTION_STRING=
TOKEN_SECRET=
WEATHER_API_KEY=
PORT=
REACT_APP_API_URL=
```

Third-party APIs
---
Weather data provided by  [Weatherapi.com](https://www.weatherapi.com/docs/). <br/>
Currencies provided by  [NBP Web API](http://api.nbp.pl/en.html). <br/>

## Backend built with
<img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>

## Frontend built with
<img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="Material UI" src="https://img.shields.io/badge/material%20ui%20-%230081CB.svg?&style=for-the-badge&logo=material-ui&logoColor=white"/> <img alt="Redux" src="https://img.shields.io/badge/redux%20-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white"/> <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="SASS" src="https://img.shields.io/badge/SASS%20-hotpink.svg?&style=for-the-badge&logo=SASS&logoColor=white"/> <img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="Webpack" src="https://img.shields.io/badge/webpack%20-%238DD6F9.svg?&style=for-the-badge&logo=webpack&logoColor=black" />

## License
This project is licensed under the terms of the [MIT license](https://github.com/Kurdiumov/airline-reservation-service/blob/main/LICENSE).
