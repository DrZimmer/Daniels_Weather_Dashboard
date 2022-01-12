//current city need: Name (current date), nl temp, nl wind, then humidity, finally uv index
//5-day forecast: next day date, weather icon, temp, wind, humidity.. then x4 for 4 next days.

//ALL DOMS
const baseURL = 'https://api.openweathermap.org';
const apiKey = 'a1c50c2bb53e239b0e195a3c619382ec';
var userFormEl = document.querySelector("#user-form");
var searchHistoryEl = document.querySelector("#search-history");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var cityNameEl = document.querySelector("#city-name");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("#uv");
var weatherIcon = document.querySelector("#weather-icon");
//day 1 forecast elements
var dateOneEl = document.querySelector("#date1");
var iconOne = document.querySelector("#icon1")
var tempOneEl = document.querySelector("#temp1");
var windOneEl = document.querySelector("#wind1");
var humidityOneEl = document.querySelector("#humidity1");
//day 2 forecast elements
var dateTwoEl = document.querySelector("#date2");
var iconTwo = document.querySelector("#icon2")
var tempTwoEl = document.querySelector("#temp2");
var windTwoEl = document.querySelector("#wind2");
var humidityTwoEl = document.querySelector("#humidity2");
//day 3 forecast elements
var dateThreeEl = document.querySelector("#date3");
var iconThree = document.querySelector("#icon3")
var tempThreeEl = document.querySelector("#temp3");
var windThreeEl = document.querySelector("#wind3");
var humidityThreeEl = document.querySelector("#humidity3");
//day 4 forecast elements
var dateFourEl = document.querySelector("#date4");
var iconFour = document.querySelector("#icon4")
var tempFourEl = document.querySelector("#temp4");
var windFourEl = document.querySelector("#wind4");
var humidityFourEl = document.querySelector("#humidity4");
//day 5 forecast elements
var dateFiveEl = document.querySelector("#date5");
var iconFive = document.querySelector("#icon5")
var tempFiveEl = document.querySelector("#temp5");
var windFiveEl = document.querySelector("#wind5");
var humidityFiveEl = document.querySelector("#humidity5");

//BREAK HERE INTO FUNCTIONS

//Load cities that have been searched before
$(document).ready(function () {
  getCity();
});

var reset = function() {
  dateOneEl.textContent = '';
  iconOne.textContent = '';
  tempOneEl.textContent = '';
  windOneEl.textContent = '';
  humidityOneEl.textContent = '';
  dateTwoEl.textContent = '';
  iconTwo.textContent = '';
  tempTwoEl.textContent = '';
  windTwoEl.textContent = '';
  humidityTwoEl.textContent = '';
  dateThreeEl.textContent = '';
  iconThree.textContent = '';
  tempThreeEl.textContent = '';
  windThreeEl.textContent = '';
  humidityThreeEl.textContent = '';
  dateFourEl.textContent = '';
  iconFour.textContent = '';
  tempFourEl.textContent = '';
  windFourEl.textContent = '';
  humidityFourEl.textContent = '';
  dateFiveEl.textContent = '';
  iconFive.textContent = '';
  tempFiveEl.textContent = '';
  windFiveEl.textContent = '';
  humidityFiveEl.textContent = '';
};

//input city form function
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    getWeatherGeo(city);
    getWeatherData(city);
    //might need to include another function here for 5 day forecast

    saveCity(city);

    // clear old content
    cityNameEl.textContent = '';
    cityInputEl.value = '';
    weatherContainerEl.textContent = "";

    reset();

  } else {
    alert("Please enter a City");
  }
};


//api geo call function
var getWeatherGeo = function(city) {
  // format the github api url
  var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + apiKey;
  // make a request to the url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
      console.log(data);
      displayCurrentWeather(data, city);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
};

//api data call function
var getWeatherData = function(city) {
  // format the github api url
  var apiUrl2 = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=imperial';
  // make a request to the url
  fetch(apiUrl2).then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
      console.log(data);
      displayCurrentWeather(data, city);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
};

var displayCurrentWeather = function(weather, city) {
  cityNameEl.textContent = '';
  // check if api returned any cities
  if (city.length === 0) {
    weatherContainerEl.textContent = "No Cities found.";
    return;
  }
  // City name
  var nameOfCity = document.createElement("h3");
  nameOfCity.textContent = weather.name;
  cityNameEl.appendChild(nameOfCity);
  // loop over Cities
  for (var i = 0; i < city.length; i++) {
    // format City name
    // var cityName = city[i].name;

    // create the city weather container
    var cityEl = document.createElement("li");
    cityEl.textContent = "hi"
    cityEl.classList = "list-item flex-row justify-space-between align-center";
    //WRITE IN HERE MUST INCLUDE Name (current date), nl temp, nl wind, then humidity, finally uv index
    // append to container
    cityEl.appendChild(weatherContainerEl);
  };
};

var fiveDayForecast = function(city) {
  var forecastAPI =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=a1c50c2bb53e239b0e195a3c619382ec&units=imperial&";
  fetch(forecastAPI).then(function (response) {
    response.json().then(function (data) {
      displayFiveDayForecast(data, city);
    });
  });
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
    cityEl.appendChild(fiveDayEl);
  };
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);