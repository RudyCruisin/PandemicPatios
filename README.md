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

## Code Highlights

Using Google Autocomplete to Add a Restaurant Address
![Google Autocomplete](https://user-images.githubusercontent.com/67700253/98744869-77f0fc00-2380-11eb-8561-18d2a108e644.png)
![Google Autocomplete2](https://user-images.githubusercontent.com/67700253/98744839-67408600-2380-11eb-9bf1-27f120c31722.png)

---

## Installing and Using PandemicPatios

* Install [Node.js](https://nodejs.org/en/download/).
* Clone the repository.
* Use the package manager [npm](https://www.npmjs.com/get-npm) to run `npm install` in the project directory.
* Create a `.env` file in the root of the project. The following variables are required:
    * `PORT`: Port where the backend server will run; use 9000 for local development
    * `DB_USER`: Local user
    * `DB_PASS` : Local user password
    * `DB_NAME` : Local database, use pandemicpatios_dev 
    * `DB_HOST` : Local hosting platform, use localhost
    * `HOST` : Local hosting url, use http://localhost:9000 for local testing
    * Various Passport.js Credentials for Given Strategies : [Github](http://www.passportjs.org/packages/passport-github/), [Facebook](http://www.passportjs.org/packages/passport-facebook/), [Google](http://www.passportjs.org/packages/passport-google-oauth2/), [Twitter](http://www.passportjs.org/packages/passport-twitter/).
      - `GH_ID` 
      - `GH_SECRET`
      - `GH_CALLBACK`
      - `FB_ID`
      - `FB_SECRET`
      - `FB_CALLBACK`
      - `GOOGLE__CLIENT_ID`
      - `GOOGLE_CLIENT_SECRET`
      - `GOOGLE_CALLBACK`
      - `TWIT_ID`
      - `TWIT_SECRET`
      - `TWIT_CALLBACK`
    * Authentication IDs by Strategy for table relations
      - `TWIT_DBID=1`
      - `FB_DBID=2`
      - `GOOG_DBID=3`
      - `GH_DBID=4`
         
* Run `npm start` to start the server.
* Visit `http://localhost:9000`.

---

## Technologies Used

* Express.js
* Passport.js
* Sequelize
* PostgreSQL
* Node.js
* Node Fetch
* Javascript
* HTML
* CSS

---

## APIs Used

* [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/overview)
* [Google Places API](https://developers.google.com/places/web-service/overview)
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
