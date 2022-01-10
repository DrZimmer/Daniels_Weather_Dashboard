//current city need: Name (current date), nl temp, nl wind, then humidity, finally uv index
//5-day forecast: next day date, weather icon, temp, wind, humidity.. then x4 for 4 next days.
var userFormEl = document.querySelector("#user-form");
var searchHistoryEl = document.querySelector("#search-history");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var fiveDayEl = document.querySelector("#five-day");
var dayOneEl = document.querySelector("#day-one");
var dayTwoEl = document.querySelector("#day-two");
var dayThreeEl = document.querySelector("#day-three");
var dayFourEl = document.querySelector("#day-four");
var dayFiveEl = document.querySelector("#day-five");

//input city form function
var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    getWeather(city);

    // clear old content
    weatherContainerEl.textContent = "";
    fiveDayEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var buttonCityHistory = function(event) {

};

//api call function
var getWeather = function(city) {
  // format the github api url
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3fed7a6ebcb4e1b063e09df15c8e9e7c&units=imperial';
  // make a request to the url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
      console.log(data);
      displayCurrentWeather(data, city);
      displayCurrentWeather(data, city);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    alert("Unable to connect");
  });
};

var displayCurrentWeather = function(city) {
  // check if api returned any cities
  if (city.length === 0) {
    weatherContainerEl.textContent = "No Cities found.";
    return;
  }
  // loop over Cities
  for (var i = 0; i < city.length; i++) {
    // format City name
    // var cityName = city[i].name;

    // create the city weather container
    var cityEl = document.createElement("li");
    cityEl.classList = "list-item flex-row justify-space-between align-center";
    //WRITE IN HERE MUST INCLUDE Name (current date), nl temp, nl wind, then humidity, finally uv index
    // append to container
    cityEl.appendChild(weatherContainerEl);
  };
};

var displayFiveDayForecast = function(city) {
  // check if api returned any cities
  if (city.length === 0) {
    fiveDayEl.textContent = "No Cities found.";
    return;
  }
  // loop over Cities
  for (var i = 0; i < city.length; i++) {
    // format City name
    // var cityName = city[i].name;

    // create the city weather container
    var cityEl = document.createElement("li");
    cityEl.classList = "list-item flex-row justify-space-between align-center";
    //WRITE IN HERE MUST INCLUDE Name next day date, weather icon, temp, wind, humidity.. then x4 for 4 next days.
    // append to container
    cityEl.appendChild(weatherContainerEl);
  };
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryEl.addEventListener("click", buttonCityHistory);