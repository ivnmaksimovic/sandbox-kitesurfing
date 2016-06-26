$('.js-get-weather-rss').on('click', function(e){
  e.preventDefault();

  $.ajax({
    url: "http://www.kitesurfingmontenegro.com/weather/RSS/weewx_rss.xml"
  }).done(function (response) {
    console.log(response);
  });

});
