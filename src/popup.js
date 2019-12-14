'use strict';

const input = document.getElementById('input');
const autocomplete = new google.maps.places.Autocomplete(input);
const outputOpenHours = document.getElementById('output-open-hours');
const outputIsOpen = document.getElementById('output-isOpen');
autocomplete.setTypes(['establishment']);

document.addEventListener('DOMContentLoaded', function () {
  autocomplete.addListener('place_changed', function () {
    displayOpenHours();
  });
});

input.addEventListener('input', function () {
  outputOpenHours.innerHTML = '';
  outputIsOpen.innerHTML = '';
  document.body.style.height = '270px';
});

function displayOpenHours() {
  let place = autocomplete.getPlace();

  if (!place.opening_hours) {
    outputOpenHours.innerHTML = "Sorry, no info available";
  } else {
    outputIsOpen.innerHTML = place.opening_hours.open_now ? 'Yes' : 'No';
  }

  place.opening_hours.weekday_text.forEach(openHour => {
    let p = document.createElement("P"); 
    let text = document.createTextNode(openHour); 
    p.appendChild(text); 
    outputOpenHours.appendChild(p);
  });
}