$(document).ready(function() {
     //DEFINE LONGITUTE, LATITUDE AND API 
      //GET LONGITUTE AND LATITUDE
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
         lat= "lat=" + position.coords.latitude;
         lon= "lon=" +position.coords.longitude;    
         displayData(lat, lon);
        });
      }else {
        console.log("Geolocation is not supported by this browser.");
      }

    });


    function displayData(lat, lon){

      var api="https://fcc-weather-api.glitch.me/api/current?";
      
      var url = api + lat + "&" + lon;
      $("#chip").children().hide();
      $("#loader").show();
      //GETTING DATA FROM URL
      $.getJSON(url, function(data) {
        console.log(data);
        $("#chip").children().show();
        $("#loader").hide();
        $("#place").html(data.name + ", " + data.sys.country);
        $("#windSpeed").html(data.wind.speed + "km/h");
        $("#humidity").html(data.main.humidity + "%");
        $("#celsius").html(data.main.temp.toFixed(1) + "°C");
        $("#temp").html(data.main.temp.toFixed(1));
        $("#description").html(data.weather[0].description);
        $("#sunset").html(new Date(data.sys.sunset*1000).toLocaleString());
        $("#sunrise").html(new Date(data.sys.sunrise*1000).toLocaleString());


        var dt = new Date();
        $("#dateTime").html(dt.getDate() + "/" + (dt.getMonth()+1)  + "/" + dt.getFullYear() + " "+ dt.getHours() + ":" + dt.getMinutes());

        if(data.weather[0].description.indexOf("clouds")!== -1){
            $("#weather-icon").html("<i class='wi wi-day-cloudy' style='font-size: 4em'></i>");   
          }
          else if(data.weather[0].description.indexOf("clear sky")!== -1){
            $("#weather-icon").html("<i class='wi wi-day-sunny' style='font-size: 4em'></i>");
          }
          else if(data.weather[0].description.indexOf("haze")!== -1){
            $("#weather-icon").html("<i class='wi wi-day-haze' style='font-size: 4em'></i>");
          }
          else if(data.weather[0].description.indexOf("rain")!== -1){
            $("#weather-icon").html("<i class='wi wi-rain-wind' style='font-size: 4em'></i>");
          }

          

      });   
    }

    function search() {
      var textPosition = $("#search").val().split(' ').join('+');
      var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${textPosition},+CA&key=AIzaSyCHQyx6ONu1Djj6FXR_G-NPcNbh-eYK9tA`;
      $.getJSON(url, function(data) {
        var lat = "lat=" + data.results[0].geometry.location.lat;
        var lon = "lon=" + data.results[0].geometry.location.lng;
        console.log(data);
        displayData(lat,lon);
      });
    }

    function getFahrenheit() {
      if(!$(this).hasClass("active")){
        $("#btnCelsius").css("color", "#2d314a");
        $("#btnFahrenheit").css("color", "#fff");
        $("#btnCelsius").removeClass("active");
        $("#btnFahrenheit").addClass("active");
        $("#temp").html(((parseInt($("#temp").text()) * 1.8) + 32).toFixed(1));
      }
    }

    function getCelsius() {
      if(!$(this).hasClass("active")){
        $("#btnCelsius").css("color", "#fff");
        $("#btnFahrenheit").css("color", "#2d314a");
        $("#btnCelsius").addClass("active");
        $("#btnFahrenheit").removeClass("active");
        $("#temp").html(Math.round((parseInt($("#temp").text()) - 32)/ 1.8).toFixed(1));
      }
    }