// THIS IS THE CALLBACK FUNCTION THAT IS CALLED IN THE SCRIPT TAG IN INDEX.HTML
function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("restaurants-map"), {
        // open map with center on Atlanta
        center: { lat: 33.7537, lng: -84.3863  },
        zoom: 13,
    });
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    // restrict to only cities in the US
    const options = {
        types: ['(cities)'],
        componentRestrictions: {country: 'us'}
      };
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
    autocomplete.addListener("place_changed", () => {
      marker.setVisible(false);
      const place = autocomplete.getPlace();
  
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
    });
  }