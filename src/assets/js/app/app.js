$('.js-get-weather-rss').on('click', function(e){
  e.preventDefault();

  $.ajax({
    url: "/weather/RSS/weewx_rss.xml"
  }).done(function (response) {
    console.log(response);
    var parsedXML = $.parseXML(response);
    console.log($(parsedXML).find('title'));
  });

});
