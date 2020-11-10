// ADD GOOGLE MAP
function displayMap() {
    const mapOptions = {
      // open map with center on Atlanta
      center: { lat: 33.7537, lng: -84.3863  },
      zoom: 13,
      fullscreenControl: false
    };
    const mapDiv = document.getElementById('restaurants-map');
    return new google.maps.Map(mapDiv, mapOptions);
}

// ADD GOOGLE AUTOCOMPLETE FUNCTIONALTY TO MAP
function initAutocomplete(map) {
    const input = document.getElementById("pac-input");
    // restrict to only cities in the US
    const options = {
        types: ['(cities)'],
        componentRestrictions: {country: 'us'}
      };
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo("bounds", map);
      // Set the data fields to return when the user selects a place.
      autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
      return autocomplete;
}

// GET RESTAURANTS FROM DB
function getRestaurants() {
    return fetch('/restaurant/getAll')
    .then(response => response.json())
    .then((data) => {
        console.log("you are in the getRestaurants()", data)
        return data
    })
    .catch(err => console.log(err))
}

// NEED A GLOBAL ARRAY OF ALL MARKERS SO CAN CLEAR MAP BEFORE EACH AUTOCOMPLETE RESULT
let restaurantMarkers = [];

// RENDER FUNCTION FOR RESTAURANT MARKERS
function renderMarkers(restaurants, map) {
    console.log("you are in renderMarkers", restaurants);
    restaurants.forEach((currentRestaurant) => {

        // CREATES A MARKER
        let marker = new google.maps.Marker({
            position: {lat: currentRestaurant.lat, lng: currentRestaurant.lng},
            map: map,
            restaurantId: currentRestaurant.id,
            restaurantName: currentRestaurant.name,
            restaurantPhone: currentRestaurant.phoneNumber
        });
        
        restaurantMarkers.push(marker);
        

        // CREATES A POPUP FOR THE MARKER
        let infowindow = new google.maps.InfoWindow({
            content: `<h6>${marker.restaurantName}</h6>
            <p>Phone Number:${marker.restaurantPhone}</p>
            <a href="/review/restaurant/reviews/${marker.restaurantId}">See Reviews</a>
            `
        });

        // ADDS CLICK EVENT LISTENER TO MARKER
        google.maps.event.addListener(marker, "click", function (e) {
            infowindow.open(map, marker);
            localStorage.setItem("restaurantId", marker.restaurantId.toString());
        });
    });
}

// A HELPER FUNCTION TO GET RID OF MARKERS AT THE BEGINNING OF renderMarkersInBoundary()
function setMapOnAll(map) {
    for (let i = 0; i < restaurantMarkers.length; i++) {
      restaurantMarkers[i].setMap(map);
    }
}
// RENDER FUNCTION FOR ONLY MARKERS IN BOUNDARY CIRCLE
function renderMarkersInBoundary(restaurants, boundaryCir, map) {
    
    // CLEAR ALL MARKERS
    setMapOnAll(null);

    // A NEW ARRAY FOR ONLY THE MARKERS WITHIN THE BOUNDARY
    let restaurantsInBoundary = [];

    console.log("you are in renderMarkersInBoundary", restaurants);
    // GETS LAT/LONGS OF CURRENT RESTAURANT & BOUNDARY CENTER & THEN USES GEOMETRY LIBRARY TO FIND THE DISTANCE BETWEEN
    restaurants.forEach((currentRestaurant) => {
        let marker_lat_lng = new google.maps.LatLng(currentRestaurant.lat, currentRestaurant.lng);
        let boundaryCirCenter = new google.maps.LatLng(boundaryCir.center.lat(), boundaryCir.center.lng());
        let distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(boundaryCirCenter, marker_lat_lng);
        
        // CHECK TO SEE IF MARKER IS WITHIN BOUNDARY CIRCLE
        if (distance_from_location <= boundaryCir.radius) {
            restaurantsInBoundary.push(currentRestaurant);
        }
    })
    // RE-RENDER MARKERS BUT ONLY THE ONES IN THE GIVEN BOUNDARY
    renderMarkers(restaurantsInBoundary, map)
}

// THIS IS THE GOOGLE MAPS CALLBACK FUNCTION IN THE SCRIPT TAG
async function runApp() {

    //google.maps.event.addDomListener(window, 'load', displayMap());

    // ADD NEW GOOGLE MAP
    const map = displayMap(); 

    // ADD CUSTOM CARDS TO MAP -- SEARCH, WEATHER, AND COVID STATS
    const searchCard = document.getElementById("pac-card");
    const weatherCard = document.getElementById("weather-card");
    const covidCard = document.getElementById("covid-card");

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchCard);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(weatherCard);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(covidCard);
    
    // ADD ATLANTA WEATHER TO WEATHER CARD ON STARTUP OF MAP
    getWeatherAtlanta()

    // ADD GEORGIA COVID DATA TO COVID CARD ON STARTUP OF MAP
    getGACovidData()

    // ADD AUTOCOMPLETE FUNCTIONALITY
    const autocomplete = initAutocomplete(map);
    
    // DEFINE LOCATION MARKER
    const locationMarker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#343b3f',
        fillOpacity: 0.6,
        strokeColor: '#343b3f',
        strokeOpacity: 0.9,
        strokeWeight: 1,
        scale: 5
      }
    });

    // DEFINE 5 MILE BOUNDARY AROUND LOCATION POINT
    const boundaryCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.15,
        map,
        center: { lat: 0, lng: 0},
        radius: 8046.72,  // in meters, so this is technically ~5 miles
    });

    // GETS ALL RESTAURANTS FROM DB
    const restaurantsFromDB = await getRestaurants();

    // RENDERS ALL RESTAURANT MARKERS ON MAP WHEN MAP LOADS
    renderMarkers(restaurantsFromDB, map);

    // ADD EVENT LISTENER TO AUTOCOMPLETE SEARCH
    autocomplete.addListener("place_changed", () => {
      locationMarker.setVisible(false);
      const place = autocomplete.getPlace();
      boundaryCircle.setVisible(false);
  
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
  
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(20); 
      }
      locationMarker.setPosition(place.geometry.location);
      locationMarker.setVisible(true);
      boundaryCircle.setCenter(place.geometry.location);
      boundaryCircle.setVisible(true);
      let boundaryCheckbox = document.getElementById ("remove-boundary-btn");
      boundaryCheckbox.checked = false;


      // ADD RESTAURANT MARKERS HERE -- ONLY WITHIN BOUNDARY CIRCLE
      renderMarkersInBoundary(restaurantsFromDB, boundaryCircle, map)

      // ALLOW FOR USER TO DESELECT BOUNDARY AND SEE ALL RESTAURANTS NEARBY. ALSO ALLOWS USER TO RESELECT GIVEN BOUNDARY
      boundaryCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            renderMarkers(restaurantsFromDB, map);
            boundaryCircle.setVisible(false);
        } else {
            renderMarkersInBoundary(restaurantsFromDB, boundaryCircle, map)
            boundaryCircle.setVisible(true);
        }
      });

      // LINK UP WEATHER DATA
      getWeather(place);

      // LINK UP COVID DATA
      getCovidData(place);

    });
}
// WEATHER API STUFF

function getWeather(placeResult) {

    // SET LAT & LONG FOR WEATHER API
    const lat = placeResult.geometry.location.lat();
    const long = placeResult.geometry.location.lng();

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${OW_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        drawWeather(data);
    })
    .catch(err => console.log(err))
}

function drawWeather(data) {
    let roundedTemp = Math.round(parseFloat(data.main.temp))
    let iconcode = data.weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

    document.getElementById('weather-icon').src = iconurl;
    document.getElementById('location').innerHTML = data.name;
    document.getElementById('description').innerHTML = data.weather[0].description;
    document.getElementById('temp').innerHTML = roundedTemp + '&#8457;';
    document.getElementById('humidity').innerHTML = data.main.humidity + '% Humidity';
}

// WEATHER API STUFF AT STARTUP --> ATLANTA INFO
function getWeatherAtlanta() {

    // SET LAT & LONG FOR WEATHER API
    const lat = 33.7537
    const long = -84.3863

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${OW_API_KEY}`)
    .then(response => response.json())
    .then(data => {
        drawWeather(data);
    })
    .catch(err => console.log(err))
}

// COVID Data Stuff

function getCovidData(placeResult) {

    // THIS IS THE STATE CODE FROM THE AUTOCOMPLETE RESULT
    const state_short = placeResult.address_components[2].short_name.toLowerCase();

    fetch(`https://api.covidtracking.com/v1/states/${state_short}/current.json`)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        drawCovid(placeResult, data);
    })
    .catch(err => console.log(err))
}

function drawCovid(placeResult, data) {

    // THIS IS THE STATE NAME FROM THE AUTOCOMPLETE RESULT
    const state = placeResult.address_components[2].long_name;

    document.getElementById('state').innerHTML = state;
    document.getElementById('cases').innerHTML = `Increase in Cases: ${data.positiveIncrease}`;
    document.getElementById('hospitalizations').innerHTML = `Increase in Hospitalizations: ${data.hospitalizedIncrease}`;
    document.getElementById('deaths').innerHTML = `Increase in Deaths: ${data.deathIncrease}`;
} 

// COVID API STUFF AT STARTUP -- GEORGIA
function getGACovidData() {

    // THIS IS THE STATE CODE FROM THE AUTOCOMPLETE RESULT
    const state_short = "ga";

    fetch(`https://api.covidtracking.com/v1/states/${state_short}/current.json`)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        drawGACovid(data);
    })
    .catch(err => console.log(err))
}

function drawGACovid(data) {

    document.getElementById('state').innerHTML = "Georgia";
    document.getElementById('cases').innerHTML = `Increase in Cases: ${data.positiveIncrease}`;
    document.getElementById('hospitalizations').innerHTML = `Increase in Hospitalizations: ${data.hospitalizedIncrease}`;
    document.getElementById('deaths').innerHTML = `Increase in Deaths: ${data.deathIncrease}`;
} 
