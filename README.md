# PandemicPatios

![last commit](https://img.shields.io/github/last-commit/DanielBGallagher/PandemicPatios)
![open issues](https://img.shields.io/github/issues-raw/DanielBGallagher/PandemicPatios)
![contributors](https://img.shields.io/github/contributors/DanielBGallagher/PandemicPatios)
![license](https://img.shields.io/github/license/DanielBGallagher/PandemicPatios)
![languages](https://img.shields.io/github/languages/count/DanielBGallagher/PandemicPatios)
![top language](https://img.shields.io/github/languages/top/DanielBGallagher/PandemicPatios)

---

## Our Purpose
We are a COVID-era, yelp-style review site for outdoor dining. We provide our users with patron-rated information on how specific restaurants are handling social-distancing, sanitation, mask mandates, etc. Winter is Coming! How are patios accommodating cold or rainy weather? Head over to [PandemicPatios](https://pandemicpatiosdev.herokuapp.com/) to find out!

---

## Code Snippets

---

## Installing and Using PandemicPatios

* Install [Node.js](https://nodejs.org/en/download/).
* Clone the repository.
* Use the package manager [npm](https://www.npmjs.com/get-npm) to run `npm install` in the project directory.
* Create a `.env` file in the root of the project. The following variables are required:
    * `PORT`: Port where the backend server will run; use 9000 for local development
    * `TBD` 
* Create a `preview.js` file in the js folder of the project and add the following code:
    * `const OW_API_KEY = <your-OpenWeather-key>` : API Key to [OpenWeather API](https://openweathermap.org/api)
* Run `npm start` to start the server.
* Visit `http://localhost:9000`.

---

## Technologies Used

* Express.js
* Passport.js
* PostgreSQL
* Node.js
* Javascript
* HTML
* CSS

---

## APIs Used

* [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/overview)
* [Google Places API](https://developers.google.com/places/web-service/overview)
* [Open Weather Map API](https://openweathermap.org/api)
* [The Covid Tracking Project Data API](https://covidtracking.com/data/api)

---

## Contributors
[Rudy Saavedra](http://github.com/RudyCruisin)\
[Daniel Gallagher](http://github.com/DanielBGallagher)\
[Ali Kasper](http://github.com/alikasper)\
[Caitlin Crawford](http://github.com/caitlincraw)

---

## License

MIT. See [LICENSE](./LICENSE.md)
