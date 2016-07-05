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
    $('.js-weather-date').html(Weather.getCurrent().title);
    $('.js-weather-text').html(Weather.getCurrent().description);
  });

});

var Weather = (function () {
  var current = {
    title: "",
    pubDate: "",
    description: "",
    content: ""
  };

  var day = {
    title: "",
    pubDate: "",
    description: "",
    content: ""
  };

  var month = {
    title: "",
    pubDate: "",
    description: "",
    content: ""
  };

  var year = {
    title: "",
    pubDate: "",
    description: "",
    content: ""
  };

  return {
    /**
     * Returns weather summary part from parsed weather RSS.
     * timeFrame defaults to current. RSS contains more "item"s which are
     * daily, monthly and yearly weather data
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

    geDaily: function () {
      return day;
    },

    getMonthly: function () {
      return month;
    },

    getYearly: function () {
      return year;
    },

    setWeather: function (weatherData) {
      var self = this;
      var currentWeatherData = self.getWeatherSummary(weatherData, "current");
      current.title = currentWeatherData.find('title').html();
      current.pubDate = currentWeatherData.find('pubDate').html();
      current.description = currentWeatherData.find('description').html();
      current.content = currentWeatherData.find('encoded').html();

      var dayWeatherData = self.getWeatherSummary(weatherData, "day");
      day.title = dayWeatherData.find('title').html();
      day.pubDate = dayWeatherData.find('pubDate').html();
      day.description = dayWeatherData.find('description').html();
      day.content = dayWeatherData.find('encoded').html();

      var monthWeatherData = self.getWeatherSummary(weatherData, "month");
      month.title = monthWeatherData.find('title').html();
      month.pubDate = monthWeatherData.find('pubDate').html();
      month.description = monthWeatherData.find('description').html();
      month.content = monthWeatherData.find('encoded').html();

      var yearWeatherData = self.getWeatherSummary(weatherData, "year");
      year.title = yearWeatherData.find('title').html();
      year.pubDate = yearWeatherData.find('pubDate').html();
      year.description = yearWeatherData.find('description').html();
      year.content = yearWeatherData.find('encoded').html();
    }
  };
})();
