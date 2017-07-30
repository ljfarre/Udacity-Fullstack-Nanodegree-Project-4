/*four-square-api.js
Created By: Lee Farretta
Project Name: Lee's Monterey Golf Map
Release Date: 7/27/17
Version: 1.0
Created for: Udacity Fullstack Nanodegree
Description: Adds FourSquare course data asynchronously to map infowindow using
jQuery ajax getJSON method.*/

//Adds Foursquare course data to the courseInfoWindow for ech course marker when
//called from the addCourseMarkerAnimationInfo function.
var FoursquareCourseData = function(course) {
	var url = 'https://api.foursquare.com/v2/venues/';
	var foursquareCourseId = course.fourSquareID;
	var clientId = '?client_id=VQFFQ0I110JADCYTWE2OJ542EAUDRXPICD0VHVZDJNMTSDJE';
	var clientSecret = '&client_secret=AUYY0PSPCIHH4HUFIQTMTMYLJSS2BQM4TIPNR5EY3G141UEK';
	var v = '&v=20130815';
	var foursquareURL = url + foursquareCourseId + clientId + clientSecret + v;

  //Uses getJSON method to asynchronously get FourSquare object for
  //the courseMarker courseInfoWindow.
	$.getJSON(foursquareURL, function(data) {
			var courseData = data.response.venue;
			var name, courseURL, address, phone, rating, ratings, likes;

			if (courseData.name) {
				name = courseData.name;
			} else {
				name = 'Course Name NA';
			}

			if (courseData.canonicalUrl) {
				courseURL = courseData.canonicalUrl;
			} else {
				courseURL = 'CanonicalUrl NA';
			}

			if (courseData.location.formattedAddress) {
				address = courseData.location.formattedAddress;
			} else {
				address = 'Formatted Address NA';
			}

			if (courseData.contact.formattedPhone) {
				phone = courseData.contact.formattedPhone;
			} else {
				phone = 'Phone NA';
			}

			if (courseData.rating) {
				rating = courseData.rating + '/10';
			} else {
				rating = 'Rating NA';
			}

			if (courseData.ratingSignals) {
				ratings = courseData.ratingSignals;
			} else {
				ratings = 'Ratings NA';
			}

			if (courseData.likes.count) {
				likes = courseData.likes.count;
			} else {
				likes = 'Likes NA';
			}

      //Defines formatted course content for the courseInfoWindow and sets it into
      //the infowindow.
			var fourSquareContent =
				'<div><h3>' + '<a href="' + courseURL + '" target="_blank">' + name + ' ' +
				'<img src="images/foursquare-icon.png" alt="Foursquare Link"></img></a></h3>' +
				'<p><h6>' + 'Address: </h6>' + address + '</p>' +
				'<p><h6>Phone: </h6>' + phone + ' ' + '<h6>Directions: </h6>' +
				'<a target="_blank" href=https://www.google.com/maps/dir/Current+Location/' +
				course.latlng[0] + ',' + course.latlng[1] + '>' + ' ' + '<b>Google Maps Directions </b>' +
				'<img src="images/google-icon.png" alt="Google Directions Link"></img></a></p>' +
				'<p><h6>FS Rating: </h6>' + rating + ' ' + '<h6>Likes: </h6>' +
				likes + ' ' + '<h6>Num of Ratings: </h6>' + ratings + '</p>' +
				'<br>' + '<br>' + '<br>' + '<br>' + '</div>';

			return courseInfoWindow.setContent(fourSquareContent);
		})

    //Generates error if getJSON fails to retrieve FourSquare api json object.
		.fail(function() {
			return courseInfoWindow.setContent('Could Not Access Foursquare, try restaring app!');
		});
};
