let placeSearch;
let autocomplete;
const componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  postal_code: "short_name",
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    { types: ["geocode"] }
  );
  // Avoid paying for data that you don't need by restricting the set of place fields that are returned 
  autocomplete.setFields(["address_component", "geometry"]);
  // When the user selects an address from the drop-down, populate the address fields in the form and save the lat longs for that address.
  autocomplete.addListener("place_changed", () => {
    fillInAddress();
    geocodeRestaurants();
  });
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  console.log("this is the place", place);

  for (const component in componentForm) {
    document.getElementById(component).value = "";
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (const component of place.address_components) {
    const addressType = component.types[0];

    if (componentForm[addressType]) {
      const val = component[componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// SEND LAT/LONGS FROM AUTOCOMPLETE
function geocodeRestaurants() {

const latitudeTable = document.getElementById("lat");
const longitudeTable = document.getElementById("lng");

latitudeTable.value = "";
longitudeTable.value = "";
latitudeTable.disabled = false;
longitudeTable.disabled = false;

const lat = autocomplete.getPlace().geometry.location.lat();
const lng = autocomplete.getPlace().geometry.location.lng();

latitudeTable.value = lat;
longitudeTable.value = lng;
}

// EVENT LISTENER ON SUBMIT
const stringifyFormData = fd => {
  const data = {}
  for(let field of fd.keys()){
      data[field] = fd.get(field)
  }
  return JSON.stringify(data, null, 2)
}

const handleSubmit = e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const stringified = stringifyFormData(data)
  sendBusiness(stringified);
  window.close();
}

const form = document.getElementById('businessForm')
form.addEventListener('submit', handleSubmit);

const sendBusiness = async (restaurantAddress)=> {
  console.log(restaurantAddress)
  await fetch ('/restaurant/add', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      body: restaurantAddress
      })
}