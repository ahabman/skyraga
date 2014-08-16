var ready;
ready = function() {

  // get location
  // get weather
  // get data

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
    $.get( url, use_weather);
  }

  function use_weather(data, textStatus, jqXHR){
    structured_data = {};
    structured_data.temp = parseInt(data.main.temp);
    structured_data.desc = data.weather[0].description;
    structured_data.humidity = parseInt(data.main.humidity);
    structured_data.pressure = parseInt(data.main.pressure);
    structured_data.wind_speed = parseInt(data.wind.speed);
    structured_data.clouds = parseInt(data.clouds.all);
    structured_data.data = data;

    get_data(structured_data);
    populate_weather(structured_data);
  }

  function get_data(structured_data){
    url = '/query?temp=' + structured_data.temp;
    url += '&humidity=' + structured_data.humidity;
    url += '&pressure=' + structured_data.pressure;
    url += '&wind=' + structured_data.wind_speed;
    url += '&clouds=' + structured_data.clouds;
    url += '&desc=' + structured_data.desc.replace(' ', '+');
    console.log('url',url)
    $.get( url, populate_data);
  }

  function populate_data(data){
    $.each(data, function(index, record){
      $('#others').append( '<li>'+record.text+'</li>' )
    })

    //rotateInDownLeft
    $('.tlt').textillate({ initialDelay: 700, loop: true, minDisplayTime: 1700, in:{effect:'bounceInUp'}, out: {effect: 'hinge', shuffle: true} });

  }
  function populate_weather(structured_data){
    console.log('structured_data',structured_data)
    $('#temp').html( structured_data.temp )
    $('#desc').html( structured_data.desc )
    $('#humidity').html( structured_data.humidity )
    $('#pressure').html( structured_data.pressure )
    $('#wind').html( structured_data.wind_speed )
    $('#clouds').html( structured_data.clouds )

    $('#word_temp').val( structured_data.temp )
    $('#word_desc').val( structured_data.desc )
    $('#word_humidity').val( structured_data.humidity )
    $('#word_pressure').val( structured_data.pressure )
    $('#word_wind').val( structured_data.wind_speed )
    $('#word_clouds').val( structured_data.clouds )
    $('#word_weather').val( JSON.stringify(structured_data.data) );
  }

  colors = ['#3D7CB8', '#457326', '#EB6841', '#1B676B', '#59A80F'];
  color = colors[ Math.floor(Math.random()*colors.length) ];
  $('form#new_word input').css('background-color', color);


};

$(document).ready(ready); 
$(document).on('page:load', ready);

