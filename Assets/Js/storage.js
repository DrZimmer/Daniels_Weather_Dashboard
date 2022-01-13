function saveCity(lat, lon, city) {
  var cities = JSON.parse(window.localStorage.getItem("cities")) || [];

  //save to storage
  let foundCity = cities.find((city) => city.name === city);

  if (foundCity != true) {
    //only add it when it is not in storage already
    let newCity = {
      name: city,
      lat: lat,
      lon: lon,
      dateAdded: new Date(),
    };
    cities.push(newCity);
  }

  window.localStorage.setItem("cities", JSON.stringify(cities));
  getCity();
};

function getCity() {
  searchHistoryEl.textContent = "";
  var getCities = JSON.parse(window.localStorage.getItem("cities")) || [];
  getCities.sort(function (a, b) {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });
  if (getCities.length > 0) {
    for (let i = 0; i < getCities.length; i++) {
      var searchHistoryButton = document.createElement("button");
      searchHistoryButton.textContent = getCities[i].name;
      searchHistoryButton.classList = "btn btn-secondary btn-lg btn-block mt-4";
      searchHistoryButton.addEventListener("click", function () {
        // getWeatherGeo(getCities[i].name);
        getWeatherData(getCities[i].lat, getCities[i].lon, getCities[i].name);
        // fiveDayForecast(getcities[i].name);
      });
      searchHistoryEl.appendChild(searchHistoryButton);
    }
  }
};
