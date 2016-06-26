$('.js-get-weather-rss').on('click', function(e){
  e.preventDefault();

  $.ajax({
    type: "GET",
    url: "/weather/RSS/weewx_rss.xml",
    dataType: "xml"
  }).done(function (response) {
    Weather.setWeather(response);
    console.log(response);
    console.log(Weather.getCurrent());

  });

});

var Weather = (function () {
  var current = {
    title: "",
    pubDate: "",
    description: ""
  };

  return {
    /**
     * Returns weather summary part from parsed weather RSS.
     * timeFrame defaults to current
     * @param weatherData
     * @param timeFrame
     * @returns {*|jQuery}
     */
    getWeatherSummary: function (weatherData, timeFrame) {
      timeFrame = timeFrame || "current";

      var rssTimeFrameMap = {
        "current": 0,
        "day": 1,
        "month": 2,
        "year": 3
      };

      return $(weatherData).find('item').eq(rssTimeFrameMap[timeFrame]);
    },

    getCurrent: function () {
      return current;
    },

    setWeather: function (weatherData) {
      var self = this;
      var currentWeatherData = self.getWeatherSummary(weatherData);
      current.title = currentWeatherData.find('title').html();
      current.pubDate = currentWeatherData.find('pubDate').html();
      current.description = currentWeatherData.find('description').html();
    }
  }
})();
