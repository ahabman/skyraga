var ready;ready=function(){function t(){function t(t){$("#loading_weather").hide(),lon=parseFloat(t.coords.longitude).toFixed(3),lat=parseFloat(t.coords.latitude).toFixed(3),location.hash="lon="+lon+",lat="+lat,e(lon,lat)}function a(t){console.warn("ERROR("+t.code+"): "+t.message)}var r={enableHighAccuracy:!0,timeout:5e3,maximumAge:0};$("#loading_weather").show(),navigator.geolocation.getCurrentPosition(t,a,r)}function e(t,e){url="http://api.openweathermap.org/data/2.5/weather?lat="+e+"&lon="+t+"&units=imperial",$.get(url,r)}function r(t){structured_data={},structured_data.temp=parseInt(t.main.temp),structured_data.desc=t.weather[0].description,structured_data.humidity=parseInt(t.main.humidity),structured_data.pressure=parseInt(t.main.pressure),structured_data.wind_speed=parseInt(t.wind.speed),structured_data.clouds=parseInt(t.clouds.all),structured_data.data=t,d(structured_data),l(structured_data)}function d(t){url="/query?temp="+t.temp,url+="&humidity="+t.humidity,url+="&pressure="+t.pressure,url+="&wind="+t.wind_speed,url+="&clouds="+t.clouds,url+="&desc="+t.desc.replace(" ","+"),console.log("url",url),$.get(url,u)}function u(t){$.each(t,function(t,e){$("#others").append("<li>"+e.text+"</li>")}),$(".tlt").textillate({"in":{effect:"bounceInUp"},out:{effect:"hinge",shuffle:!0},initialDelay:700})}function l(t){console.log("structured_data",t),$("#temp").html(t.temp),$("#desc").html(t.desc),$("#humidity").html(t.humidity),$("#pressure").html(t.pressure),$("#wind").html(t.wind_speed),$("#clouds").html(t.clouds),$("#word_temp").val(t.temp),$("#word_desc").val(t.desc),$("#word_humidity").val(t.humidity),$("#word_pressure").val(t.pressure),$("#word_wind").val(t.wind_speed),$("#word_clouds").val(t.clouds),$("#word_weather").val(JSON.stringify(t.data))}0==location.hash?t():(s=location.hash.substring(1),a=s.split(","),lon=a[0].split("=")[1],lat=a[1].split("=")[1],e(lon,lat))},$(document).ready(ready),$(document).on("page:load",ready);