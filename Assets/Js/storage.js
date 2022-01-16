function saveCity(lat, lon, city) {
  var cities = JSON.parse(window.localStorage.getItem("cities")) || [];

  //save to storage
  let foundCity = false;
  for(var i=0; i < cities.length; i++) {
    console.log('cities' + cities[i].name);
    if(cities[i].name === city) {
      foundCity = true;
      break;
    }
  };

  if (!foundCity) {
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
        
        getWeatherData(getCities[i].lat, getCities[i].lon, getCities[i].name);
        
      });
      searchHistoryEl.appendChild(searchHistoryButton);
    }
  }
};
