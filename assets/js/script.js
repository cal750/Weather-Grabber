var searchFormEl = document.querySelector('#search-box');
var cityInputEl = document.querySelector('#city-input');
var apiKey = "3e2723315149c3458740f87851d85a18";

var formSubmitHandler = function(event) {
    event.preventDefault();
    let City = cityInputEl.value;
    console.log('cityInputEl.nodevalue ' + cityInputEl.value);
    if (City) {
        getWeatherData(City);
        console.log('city ' + City);
        getWeatherForecast(City);
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
          var lat = data.list[0].coord.lat;
          console.log("lat " + lat);
          var lon = data.list[0].coord.lon;
          console.log("lon " + lon);
          
          var pageCity = document.querySelector('.city').textContent = ('City ' + data.list[0].name);
          var pageTemp = document.querySelector('.temp').textContent = ('The temperature is ' + data.list[0].main.temp + '°C');
          var pageHumid = document.querySelector('.humid').textContent = ('The humidity is at ' + data.list[0].main.humidity + '%');
          var pageWind = document.querySelector('.wind').textContent = ('The wind is blowing at ' + data.list[0].wind.speed + 'KM/H');
          var pageLat = document.querySelector('.lat').textContent = ('The latitude is ' + lat);
          var pageLon = document.querySelector('.lon').textContent = ('The longitude is ' + lon);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  }

var getWeatherForecast = function(City) {
  let apiUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=daily&appid=' + apiKey;

    fetch(apiUrl2)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log('City' + data.list[0].name);
          console.log('temp ' + data.list[0].main.temp);
        });
        }
        else {
          alert('Error: ' + response.statusText);
      }
    });
}
  


    
searchFormEl.addEventListener ('submit', formSubmitHandler);