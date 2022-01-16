//current city need: Name (current date), nl temp, nl wind, then humidity, finally uv index

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

//BREAK HERE INTO FUNCTIONS

//Load cities that have been searched before
$(document).ready(function () {
  getCity();
});

//input city form function
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  var city = cityInputEl.value.trim();

  if (city) {
    getWeatherGeo(city);

  } else {
    alert("Please enter a City");
  }
};


//api geo call function
var getWeatherGeo = function(city) {
  // format the weather api url
  var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + apiKey;
  // make a request to the url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
      console.table(data);
      //save the data to lat lon, and cityname
      let lat = data[0].lat;
      let lon = data[0].lon;
      let cityName = data[0].name;
      getWeatherData(lat, lon, cityName);
      saveCity(lat, lon, cityName);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
};

//api data call function
getWeatherData = function(lat, lon, cityName) {
  // format the api url
  var apiUrl2 =
  "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial&limit=5";
  // make a request to the url
  fetch(apiUrl2).then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
      console.log(data);
      displayCurrentWeather(data, cityName);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
};

//function to convert unix time to a date
var convertUnixtimeToDate = function(unixTime) {
  // unixTime = 
  var date = new Date(unixTime * 1000);
  return date.toLocaleDateString("en-US");
};

//function to display the current weather in main box
var displayCurrentWeather = function(weatherObj, cityName) {
  let dashboard = document.querySelector(".dashboard");
  dashboard.textContent = '';
  let date = convertUnixtimeToDate(weatherObj.current.dt);
  let temp = weatherObj.current.temp;
  let humidity = weatherObj.current.humidity;
  let windSpeed = weatherObj.current.wind_speed;
  let uvi = weatherObj.current.uvi;
  
  // create and display all 
  let cityDateWeatherDiv = document.createElement('div');
  cityDateWeatherDiv.setAttribute ('class', 'cityDateWeather');
  var cityDisplay = document.createElement("p");
  var dateDisplay = document.createElement("p");
  
  var imageDisplay = document.createElement("img");
  var tempDisplay = document.createElement("p");
  var humidityDisplay = document.createElement("p");
  var windSpeedDisplay = document.createElement("p");
  var uVDisplay = document.createElement("p");
  cityDisplay.textContent = cityName;
  cityDisplay.setAttribute("class", "bigger");
  dateDisplay.textContent = date;
  dateDisplay.setAttribute("class", "p-3");
  imageDisplay.setAttribute("src", `https://openweathermap.org/img/wn/${weatherObj.current.weather[0].icon}.png`);
  tempDisplay.textContent = "Current Temperature: " + temp + '\u00B0F';
  humidityDisplay.textContent = "Current Humidity: " + Math.floor(humidity) + '%';
  windSpeedDisplay.textContent = "Current Wind Speed: " + Math.floor(windSpeed) + ' mph';
  uVDisplay.textContent = "UV Index: " + uvi;

  //style UV Color based on value
  if (uvi < 4) {
    uVDisplay.setAttribute("class", "badge bg-success");
  } else if (uvi < 8 && uvi > 4) {
    uVDisplay.setAttribute("class", "badge bg-warning");
  } else {
    uVDisplay.setAttribute("class", "badge bg-danger");
  };

  //append all
  cityDateWeatherDiv.append(cityDisplay, dateDisplay, imageDisplay);
  dashboard.append(cityDateWeatherDiv, tempDisplay, humidityDisplay, windSpeedDisplay, uVDisplay);
  displayFiveDayForecast(weatherObj.daily);
};

//function to display all 5 day forecast
var displayFiveDayForecast = function(weatherDailyObj) {
  let fiveDayForecastEl = document.querySelector("#fiveDayForecast");
  fiveDayForecastEl.textContent = ""
  let fiveDayForecastObj = weatherDailyObj.slice(1, 6);
  console.log('fivedayforecast' + JSON.stringify(fiveDayForecastObj));
  
  //for loop to create each date/icon/temp etc for each of the five days
  for(var i = 0; i < fiveDayForecastObj.length; i++) {
    let forecastDiv = document.createElement("div");
    forecastDiv.setAttribute('class', 'col-sm five-day-forecast');
    let forecastDate = convertUnixtimeToDate(fiveDayForecastObj[i].dt);
    let forecastDateDisplay = document.createElement('p');
    forecastDateDisplay.textContent = forecastDate;

    let foreCastIconDisplay = document.createElement('img');
    foreCastIconDisplay.setAttribute("src", `https://openweathermap.org/img/wn/${fiveDayForecastObj[i].weather[0].icon}.png`);

    let foreCastTemp = fiveDayForecastObj[i].temp.day;
    let foreCastTempDisplay = document.createElement('p');
    foreCastTempDisplay.textContent = "Temp: " + foreCastTemp + '\u00B0F';

    let foreCastWindSpeed = fiveDayForecastObj[i].wind_speed;
    let foreCastWindSpeedDisplay = document.createElement('p');
    foreCastWindSpeedDisplay.textContent = "Wind: " + Math.floor(foreCastWindSpeed) + ' mph';

    let foreCastHumidity = fiveDayForecastObj[i].humidity;
    let foreCastHumidityDisplay = document.createElement('p');
    foreCastHumidityDisplay.textContent = "Humidity: " + Math.floor(foreCastHumidity) + '%';

    forecastDiv.append(forecastDateDisplay, foreCastIconDisplay, foreCastTempDisplay, foreCastWindSpeedDisplay, foreCastHumidityDisplay);

    fiveDayForecastEl.append(forecastDiv);
  };
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);