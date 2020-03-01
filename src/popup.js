"use strict";

const input = document.getElementById("input");
const autocomplete = new google.maps.places.Autocomplete(input);
const outputOpenHours = document.getElementById("output-open-hours");
const outputIsOpen = document.getElementById("output-isOpen");
autocomplete.setTypes(["establishment"]);

document.addEventListener("DOMContentLoaded", function() {
  autocomplete.addListener("place_changed", function() {
    displayOpenHours();
  });
});

input.addEventListener("input", function() {
  outputOpenHours.innerHTML = "";
  outputIsOpen.innerHTML = "";
  document.body.style.height = "270px";
});

function displayOpenHours() {
  let place = autocomplete.getPlace();

  if (!place.opening_hours) {
    outputOpenHours.innerHTML = "Sorry, no info available";
  } else {
    outputIsOpen.innerHTML = place.opening_hours.open_now ? "Yes" : "No";
  }

  sortDays(place.opening_hours.weekday_text, new Date().getDay()).forEach(
    openHour => {
      let div = document.createElement("DIV");
      div.style.display = "flex";
      div.style.justifyContent = "space-between";

      let dayElem = document.createElement("P");
      let dayText = document.createTextNode(openHour.split(/ (.+)/)[0]);
      let timeElem = document.createElement("P");
      let timeText = document.createTextNode(openHour.split(/ (.+)/)[1]);
      dayElem.appendChild(dayText);
      timeElem.appendChild(timeText);
      div.appendChild(dayElem);
      div.appendChild(timeElem);
      outputOpenHours.appendChild(div);
    }
  );
}

function sortDays(days, today) {
  for (let i = 0; i < today; i++) {
    days.push(days.shift());
  }
  return days;
}
