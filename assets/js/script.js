var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city');
var apiKey = "3e2723315149c3458740f87851d85a18";
var lat;
var lon;

var formSubmitHandler = function(event) {
    event.preventDefault();
    let city = cityInputEl.value;
    console.log('cityInputEl.nodevalue ' + cityInputEl.value);
    if (city) {
        getWeatherData(city);
        console.log('city ' + city);
    }
}

var getWeatherData = function(city) {
    let apiUrl = "http://api.openweathermap.org/data/2.5/find?q=" + city + "&units=metric&appid=" + apiKey;
    
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log('City ' + data.list[0].name);
          console.log('temp ' + data.list[0].main.temp + '°C');
          console.log('wind ' + data.list[0].wind.speed + ' KPH');
          console.log('humidity ' + data.list[0].main.humidity + '%');
          var unixTime = moment.unix(data.list[0].dt).format("DD/MM/YYYY");
          console.log('date ' + unixTime);
          lat = data.list[0].coord.lat;
          console.log("lat " + lat);
          lon = data.list[0].coord.lon;
          console.log("lon " + lon);
          
          
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  }

  var getFiveDayForecast = function()
    
searchFormEl.addEventListener ('submit', formSubmitHandler);