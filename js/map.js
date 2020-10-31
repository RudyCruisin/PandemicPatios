loadMapsJSAPI();

function loadMapsJSAPI() {
  const googleMapsAPIKey = 'AIzaSyDylyELTw5HP6i0KIEp7jyIWTva_SdH2IQ';
  const googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=initAutocomplete&libraries=places&v=weekly`;
  
  const script = document.createElement('script');
  script.src = googleMapsAPIURI;
  script.defer = true;
  script.async = true;
  
  window.initAutocomplete = initAutocomplete;
  
  document.head.appendChild(script);
}

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

function initAutocomplete() {
    const map = displayMap(); 
    const searchCard = document.getElementById("pac-card");
    const weatherCard = document.getElementById("weather-card");
    const covidCard = document.getElementById("covid-card");
    const input = document.getElementById("pac-input");
    // restrict to only cities in the US
    const options = {
        types: ['(regions)'],
        componentRestrictions: {country: 'us'}
      };
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchCard);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(weatherCard);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(covidCard);
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    
    // DEFINE LOCATION MARKER
    const marker = new google.maps.Marker({
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
    const circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.15,
        map,
        center: { lat: 0, lng: 0},
        radius: 8046.72,  // in meters, so this is technically ~5 miles
    });

    // ADD EVENT LISTENER TO AUTOCOMPLETE SEARCH
    autocomplete.addListener("place_changed", () => {
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      circle.setVisible(false);
  
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
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      circle.setCenter(place.geometry.location);
      circle.setVisible(true);

      // WEATHER API STUFF
      
      // SET LAT & LONG FOR WEATHER API
      const lat = place.geometry.location.lat();
      const long = place.geometry.location.lng();

      function getWeather() {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${OW_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
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

        getWeather();

        // COVID Data Stuff
        
        // SET STATE FOR COVID API
        const state = place.address_components[2].long_name;
        const state_short = place.address_components[2].short_name.toLowerCase();

        function getCovidData() {
        fetch(`https://api.covidtracking.com/v1/states/${state_short}/current.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            drawCovid(data);
        })
        .catch(err => console.log(err))
        }

        function drawCovid(data) {

        document.getElementById('state').innerHTML = state;
        document.getElementById('cases').innerHTML = `Increase in Cases: ${data.positiveIncrease}`;
        document.getElementById('hospitalizations').innerHTML = `Increase in Hospitalizations: ${data.hospitalizedIncrease}`;
        document.getElementById('deaths').innerHTML = `Increase in Deaths: ${data.deathIncrease}`;
        }

        getCovidData();

    });
}
