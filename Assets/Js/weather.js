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
    
    reset();

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

var convertUnixtimeToDate = function(unixTime) {
  // unixTime = 
  var date = new Date(unixTime * 1000);
  return date.toLocaleDateString("en-US");
};


var displayCurrentWeather = function(weatherObj, cityName) {
  //WRITE IN HERE MUST INCLUDE Name (current date), nl temp, nl wind, then humidity, finally uv index
  let dashboard = document.querySelector(".dashboard");
  dashboard.textContent = '';
  let date = convertUnixtimeToDate(weatherObj.current.dt);
  let temp = weatherObj.current.temp;
  let humidity = weatherObj.current.humidity;
  let windSpeed = weatherObj.current.wind_speed;
  let uvi = weatherObj.current.uvi;
  
  // display all 
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

  cityDateWeatherDiv.append(cityDisplay, dateDisplay, imageDisplay);
  dashboard.append(cityDateWeatherDiv, tempDisplay, humidityDisplay, windSpeedDisplay, uVDisplay);
  displayFiveDayForecast(weatherObj.daily);
};

var displayFiveDayForecast = function(weatherDailyObj) {
  let fiveDayForecastEl = document.querySelector("#fiveDayForecast");
  fiveDayForecastEl.textContent = ""
  let fiveDayForecastObj = weatherDailyObj.slice(1, 6);
  console.log('fivedayforecast' + JSON.stringify(fiveDayForecastObj));
  for(var i = 0; i < fiveDayForecastObj.length; i++) {
    let forecastDiv = document.createElement("div");
    forecastDiv.setAttribute('class', 'col-sm five-day-forecast');
    let forecastDate = convertUnixtimeToDate(fiveDayForecastObj[i].dt);
    let forecastDateDisplay = document.createElement('p');
    forecastDateDisplay.textContent = forecastDate;

    let foreCastIconDisplay = document.createElement('img');
    foreCastIconDisplay.setAttribute("src", `https://openweathermap.org/img/wn/${fiveDayForecastObj[i].weather[0].icon}.png`);
    // foreCastIconDisplay.textContent = foreCastIcon;

    let foreCastTemp = fiveDayForecastObj[i].temp.day;
    let foreCastTempDisplay = document.createElement('p');
    foreCastTempDisplay.textContent = "Temperature: " + foreCastTemp + '\u00B0F';

    let foreCastWindSpeed = fiveDayForecastObj[i].wind_speed;
    let foreCastWindSpeedDisplay = document.createElement('p');
    foreCastWindSpeedDisplay.textContent = "Wind Speed: " + Math.floor(foreCastWindSpeed) + ' mph';

    let foreCastHumidity = fiveDayForecastObj[i].humidity;
    let foreCastHumidityDisplay = document.createElement('p');
    foreCastHumidityDisplay.textContent = "Humidity: " + Math.floor(foreCastHumidity) + '%';

    forecastDiv.append(forecastDateDisplay, foreCastIconDisplay, foreCastTempDisplay, foreCastWindSpeedDisplay, foreCastHumidityDisplay);

    fiveDayForecastEl.append(forecastDiv);
  };



  // //Date Day One
  // let unixTimestamp = weather.list[8].dt;
  // var newDate = new Date(unixTimestamp * 1000);
  // var actualDate = document.createElement("p");
  // actualDate.textContent = newDate;
  // dateOneEl.appendChild(actualDate);

  // // Icon Day One
  // iconOne.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[8].weather[0].icon}@2x.png">`;
  // //Temp Day One
  // TempOne = document.createElement("p");
  // TempOne.textContent = Math.floor(weather.list[8].main.temp) + " \u00B0F";
  // tempOneEl.appendChild(TempOne);
  // // Wind Day One
  // windOne = document.createElement("p");
  // windOne.textContent = Math.floor(weather.list[8].wind.gust) + " mph";
  // windOneEl.appendChild(windOne);
  // //Humidity Day One
  // humidityOne = document.createElement("p");
  // humidityOne.textContent = Math.floor(weather.list[8].main.humidity) + " %";
  // humidityOneEl.appendChild(humidityOne);

  // //FORECAST DAY 2
  // //Date Day 2
  // let unixTimestamp02 = weather.list[16].dt;
  // var newDate2 = new Date(unixTimestamp02 * 1000);
  // var actualDate2 = document.createElement("p");
  // actualDate2.textContent = newDate2;
  // dateTwoEl.appendChild(actualDate2);
  // // Icon Day Two
  // iconTwo.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[16].weather[0].icon}@2x.png">`;
  // //Temp Day 2
  // tempTwo = document.createElement("p");
  // tempTwo.textContent = Math.floor(weather.list[16].main.temp) + " \u00B0F";
  // tempTwoEl.appendChild(tempTwo);
  // // Wind Day 2
  // windTwo = document.createElement("p");
  // windTwo.textContent = Math.floor(weather.list[16].wind.gust) + " mph";
  // windTwoEl.appendChild(windTwo);
  // //Humidity Day 2
  // humidityTwo = document.createElement("p");
  // humidityTwo.textContent = Math.floor(weather.list[16].main.humidity) + " %";
  // humidityTwoEl.appendChild(humidityTwo);

  // //FORECAST DAY 3
  // //Date Day 3
  // let unixTimestamp03 = weather.list[24].dt;
  // var newDate3 = new Date(unixTimestamp03 * 1000);
  // var actualDate3 = document.createElement("p");
  // actualDate3.textContent = newDate3;
  // dateThreeEl.appendChild(actualDate3);
  // // Icon Day Three
  // iconThree.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[24].weather[0].icon}@2x.png">`;
  // //Temp Day 3
  // tempThree = document.createElement("p");
  // tempThree.textContent = Math.floor(weather.list[24].main.temp) + " \u00B0F";
  // tempThreeEl.appendChild(tempThree);
  // // Wind Day 3
  // windThree = document.createElement("p");
  // windThree.textContent = Math.floor(weather.list[24].wind.gust) + " mph";
  // windThreeEl.appendChild(windThree);
  // //Humidity Day 3
  // humidityThree = document.createElement("p");
  // humidityThree.textContent = Math.floor(weather.list[24].main.humidity) + " %";
  // humidityThreeEl.appendChild(humidityThree);

  // //FORECAST DAY 4
  // //Date Day 4
  // let unixTimestamp04 = weather.list[32].dt;
  // var newDate = new Date(unixTimestamp04 * 1000);
  // var actualDate = document.createElement("p");
  // actualDate.textContent = newDate;
  // dateFourEl.appendChild(actualDate);
  // // Icon Day Four
  // iconFour.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[32].weather[0].icon}@2x.png">`;
  // //Temp Day 4
  // tempFour = document.createElement("p");
  // tempFour.textContent = Math.floor(weather.list[32].main.temp) + " \u00B0F";
  // tempFourEl.appendChild(tempFour);
  // // Wind Day 4
  // windFour = document.createElement("p");
  // windFour.textContent = Math.floor(weather.list[32].wind.gust) + " mph";
  // windFourEl.appendChild(windFour);
  // //Humidity Day 4
  // humidityFour = document.createElement("p");
  // humidityFour.textContent = Math.floor(weather.list[32].main.humidity) + " %";
  // humidityFourEl.appendChild(humidityFour);

  // //FORECAST DAY 5
  // //Date Day 5
  // let unixTimestamp05 = weather.list[39].dt;
  // var newDate = new Date(unixTimestamp05 * 1000);
  // var actualDate = document.createElement("p");
  // actualDate.textContent = newDate;
  // dateFiveEl.appendChild(actualDate);
  // // Icon Day Five
  // iconFive.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[39].weather[0].icon}@2x.png">`;
  // //Temp Day 5
  // tempFive = document.createElement("p");
  // tempFive.textContent = Math.floor(weather.list[39].main.temp) + " \u00B0F";
  // tempFiveEl.appendChild(tempFive);
  // // Wind Day 5
  // windFive = document.createElement("p");
  // windFive.textContent = Math.floor(weather.list[39].wind.gust) + " mph";
  // windFiveEl.appendChild(windFive);
  // //Humidity Day 5
  // humidityFive = document.createElement("p");
  // humidityFive.textContent = Math.floor(weather.list[39].main.humidity) + " %";
  // humidityFiveEl.appendChild(humidityFive);
    //WRITE IN HERE MUST INCLUDE Name next day date, weather icon, temp, wind, humidity.. then x4 for 4 next days.
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);