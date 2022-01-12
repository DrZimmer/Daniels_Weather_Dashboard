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
      });
      //api data call function
      getWeatherData = function(city) {
        var lat = weather.coord.lat;
        var lon = weather.coord.lon;
        // format the api url
        var apiUrl2 =
        "https://api.openweathermap.org/data/2.5/weather?q=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
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
    } else {
      alert("Error: " + response.statusText);
    }
  })
};


var displayCurrentWeather = function(weather, city) {
  //WRITE IN HERE MUST INCLUDE Name (current date), nl temp, nl wind, then humidity, finally uv index
  cityNameEl.textContent = '';
  // check if api returned any cities
  if (city.length === 0) {
    weatherContainerEl.textContent = "No Cities found.";
    return;
  }
  // City name
  var nameOfCity = document.createElement("h3");
  nameOfCity.textContent = "hi";
  cityNameEl.appendChild(nameOfCity);

  // //Date
  // let unixTimestamp = weather.dt;
  // var newDate = new Date(unixTimestamp * 1000);
  // var actualDate = document.createElement("h4");
  // actualDate.textContent = newDate;
  // cityNameEl.appendChild(actualDate);
  // // var todaysDate = new Date(weather.dt * 1000);
  // // var day = todaysDate.getDate();
  // // var month = todaysDate.getMonth() + 1;
  // // var year = todaysDate.getFullYear();
  // // //var Realdate = month + "/" + day + "/" + year;
  // // cityNameUI.appendChild(month + "/" + day + "/" + year);

  // //console.log(newDate);

  // // Weather Icon
  // weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png">`;

  // tempEl.textContent = "Temp: " + Math.floor(weather.main.temp) + " \u00B0F";
  // windEl.textContent = "Wind: " + Math.floor(weather.wind.speed) + " mph";
  // humidityEl.textContent =
  //   "Humidity: " + Math.floor(weather.main.humidity) + " %";

  // //UV Index
  
  //   // "https://api.openweathermap.org/data/2.5/uvi/forecast?lat="
  // //https://api.openweathermap.org/data/2.5/uvi/forecast?lat=51.5085&lon=-0.1257&appid=HERE&cnt=1
  // fetch(indexQueryURL).then(function (response) {
  //   response.json().then(function (data) {
  //     var indexEl = document.createElement("span");

  //     if (data[0].value < 4) {
  //       indexEl.setAttribute("class", "badge bg-success");
  //     } else if (data[0].value < 8) {
  //       indexEl.setAttribute("class", "badge bg-warning");
  //     } else {
  //       indexEl.setAttribute("class", "badge bg-danger");
  //     }

  //     indexEl.innerHTML = data[0].value;
  //     uvEl.innerHTML = "UV Index: ";
  //     uvEl.append(indexEl);
// })});
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

var displayFiveDayForecast = function(weather, city) {
  reset();
  // check if api returned any cities
  if (city.length === 0) {
    fiveDayEl.textContent = "No Cities found.";
    return;
  }
  //Date Day One
  let unixTimestamp = weather.list[8].dt;
  var newDate = new Date(unixTimestamp * 1000);
  var actualDate = document.createElement("p");
  actualDate.textContent = newDate;
  dateOneEl.appendChild(actualDate);

  // Icon Day One
  iconOne.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[8].weather[0].icon}@2x.png">`;
  //Temp Day One
  TempOne = document.createElement("p");
  TempOne.textContent = Math.floor(weather.list[8].main.temp) + " \u00B0F";
  tempOneEl.appendChild(TempOne);
  // Wind Day One
  windOne = document.createElement("p");
  windOne.textContent = Math.floor(weather.list[8].wind.gust) + " mph";
  windOneEl.appendChild(windOne);
  //Humidity Day One
  humidityOne = document.createElement("p");
  humidityOne.textContent = Math.floor(weather.list[8].main.humidity) + " %";
  humidityOneEl.appendChild(humidityOne);

  //FORECAST DAY 2
  //Date Day 2
  let unixTimestamp02 = weather.list[16].dt;
  var newDate2 = new Date(unixTimestamp02 * 1000);
  var actualDate2 = document.createElement("p");
  actualDate2.textContent = newDate2;
  dateTwoEl.appendChild(actualDate2);
  // Icon Day Two
  iconTwo.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[16].weather[0].icon}@2x.png">`;
  //Temp Day 2
  tempTwo = document.createElement("p");
  tempTwo.textContent = Math.floor(weather.list[16].main.temp) + " \u00B0F";
  tempTwoEl.appendChild(tempTwo);
  // Wind Day 2
  windTwo = document.createElement("p");
  windTwo.textContent = Math.floor(weather.list[16].wind.gust) + " mph";
  windTwoEl.appendChild(windTwo);
  //Humidity Day 2
  humidityTwo = document.createElement("p");
  humidityTwo.textContent = Math.floor(weather.list[16].main.humidity) + " %";
  humidityTwoEl.appendChild(humidityTwo);

  //FORECAST DAY 3
  //Date Day 3
  let unixTimestamp03 = weather.list[24].dt;
  var newDate3 = new Date(unixTimestamp03 * 1000);
  var actualDate3 = document.createElement("p");
  actualDate3.textContent = newDate3;
  dateThreeEl.appendChild(actualDate3);
  // Icon Day Three
  iconThree.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[24].weather[0].icon}@2x.png">`;
  //Temp Day 3
  tempThree = document.createElement("p");
  tempThree.textContent = Math.floor(weather.list[24].main.temp) + " \u00B0F";
  tempThreeEl.appendChild(tempThree);
  // Wind Day 3
  windThree = document.createElement("p");
  windThree.textContent = Math.floor(weather.list[24].wind.gust) + " mph";
  windThreeEl.appendChild(windThree);
  //Humidity Day 3
  humidityThree = document.createElement("p");
  humidityThree.textContent = Math.floor(weather.list[24].main.humidity) + " %";
  humidityThreeEl.appendChild(humidityThree);

  //FORECAST DAY 4
  //Date Day 4
  let unixTimestamp04 = weather.list[32].dt;
  var newDate = new Date(unixTimestamp04 * 1000);
  var actualDate = document.createElement("p");
  actualDate.textContent = newDate;
  dateFourEl.appendChild(actualDate);
  // Icon Day Four
  iconFour.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[32].weather[0].icon}@2x.png">`;
  //Temp Day 4
  tempFour = document.createElement("p");
  tempFour.textContent = Math.floor(weather.list[32].main.temp) + " \u00B0F";
  tempFourEl.appendChild(tempFour);
  // Wind Day 4
  windFour = document.createElement("p");
  windFour.textContent = Math.floor(weather.list[32].wind.gust) + " mph";
  windFourEl.appendChild(windFour);
  //Humidity Day 4
  humidityFour = document.createElement("p");
  humidityFour.textContent = Math.floor(weather.list[32].main.humidity) + " %";
  humidityFourEl.appendChild(humidityFour);

  //FORECAST DAY 5
  //Date Day 5
  let unixTimestamp05 = weather.list[39].dt;
  var newDate = new Date(unixTimestamp05 * 1000);
  var actualDate = document.createElement("p");
  actualDate.textContent = newDate;
  dateFiveEl.appendChild(actualDate);
  // Icon Day Five
  iconFive.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.list[39].weather[0].icon}@2x.png">`;
  //Temp Day 5
  tempFive = document.createElement("p");
  tempFive.textContent = Math.floor(weather.list[39].main.temp) + " \u00B0F";
  tempFiveEl.appendChild(tempFive);
  // Wind Day 5
  windFive = document.createElement("p");
  windFive.textContent = Math.floor(weather.list[39].wind.gust) + " mph";
  windFiveEl.appendChild(windFive);
  //Humidity Day 5
  humidityFive = document.createElement("p");
  humidityFive.textContent = Math.floor(weather.list[39].main.humidity) + " %";
  humidityFiveEl.appendChild(humidityFive);
    //WRITE IN HERE MUST INCLUDE Name next day date, weather icon, temp, wind, humidity.. then x4 for 4 next days.
};

// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);