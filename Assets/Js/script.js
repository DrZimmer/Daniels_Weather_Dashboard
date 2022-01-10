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

var getWeather = function(city) {
  // format the github api url
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3fed7a6ebcb4e1b063e09df15c8e9e7c&units=imperial';
  // make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
      console.log(data);
    }
    });
  });
};
fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to GitHub");
    });
};