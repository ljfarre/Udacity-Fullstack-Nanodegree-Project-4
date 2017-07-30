/*weather-underground-api.js
Created By: Lee Farretta
Project Name: Lee's Monterey Golf Map
Release Date: 7/27/17
Version: 1.0
Created for: Udacity Fullstack Nanodegree
Description: Adds Weather Underground course data asynchronously to map infowindow using
jQuery ajax getJSON method.*/
'use strict';

//Adds Weather Underground data to the weatherInfoWindow for ech course marker when
//called from the addCourseMarkerAnimationInfo function.
var WeatherUndergroundCourseData = function(course) {
	var url = 'http://api.wunderground.com/api/';
	var token = 'e5ebaa6686b36615';
	var searchType = '/conditions/forecast/q/';
	var courseLocation = course.latlng[0] + ',' + course.latlng[1];
	var jqueryType = '.json;';
	var weatherUndergroundUrl = url + token + searchType + courseLocation + jqueryType;

  //Uses getJSON method to asynchronously get Weather Underground object for
  //the courseMarker weatherInfoWindow.
	$.getJSON(weatherUndergroundUrl, function(data) {
			var weatherData = data.current_observation;
			var weather, temp, wind, gusts;

      //Checks availability of weather data.
			if (weatherData.weather) {
				weather = weatherData.weather;
			} else {
				weather = 'NA';
			}

			if (weatherData.temp_f) {
				temp = weatherData.temp_f + ' ° F';
			} else {
				temp = 'NA';
			}

			if (weatherData.wind_mph) {
				wind = weatherData.wind_mph + ' MPH';
			} else {
				wind = 'NA';
			}

			if (weatherData.wind_gust_mph) {
				gusts = weatherData.wind_gust_mph + ' MPH';
			} else {
				gusts = 'NA';
			}

      //Defines formatted weather content for the weatherInfoWindow and sets it into
      //the infowindow.
			var content = '<div>' + '<b>Course Weather: </b>' + weather + ' ' + '<b>Temp: </b>' + temp +
				'<br>' + '<b> Wind: </b>' + wind + ' ' + '<b> Gusts: </b>' + gusts +
				'<a href= https://www.wunderground.com/us/ca/monterey"' +
				'" target="_blank"><img src="images/weatherunderground-icon.png" alt="Weather Underground Link"></img></a>' +
				'</h3>' + '</div>';
			return weatherInfoWindow.setContent(content);
		})

    //Generates error if getJSON fails to retrieve Underground Weather api json object.
		.fail(function() {
			return weatherInfoWindow.setContent('Could Not Access Weather Underground, try restarting app!');
		});
};
