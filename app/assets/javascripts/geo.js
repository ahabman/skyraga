var ready;
ready = function() {

  if( location.hash==false ){
    get_location();
  }
  else{
    s = location.hash.substring(1);
    a = s.split(',');
    lon = a[0].split('=')[1];
    lat = a[1].split('=')[1];
    get_weather(lon, lat);
  }

  function get_location(){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    $('#loading_weather').show();
    navigator.geolocation.getCurrentPosition(success, error, options)

    function success(position){
      $('#loading_weather').hide();
      lon = parseFloat(position.coords.longitude).toFixed(3);
      lat = parseFloat(position.coords.latitude).toFixed(3);
      location.hash = "lon=" +lon+ ",lat=" +lat;
      get_weather(lon, lat);
    }

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
  }

  function get_weather(lon, lat){
    url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial";
    $.get( url, show_weather)
  }

  function show_weather(data, textStatus, jqXHR){
    console.log(data);
    $('#temp').html( data.main.temp )
    $('#desc').html( data.weather[0].description )
    $('#humidity').html( data.main.humidity )
    $('#pressure').html( data.main.pressure )
    $('#wind').html( data.wind.speed )
    $('#clouds').html( data.clouds.all )
    $('#word_weather').val(  JSON.stringify(data));
  }

  


};

$(document).ready(ready); 
$(document).on('page:load', ready);

