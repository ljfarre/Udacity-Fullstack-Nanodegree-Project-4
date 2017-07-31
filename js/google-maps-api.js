/*google-maps-api.js
Created By: Lee Farretta
Project Name: Lee's Monterey Golf Map
Release Date: 7/27/17
Version: 1.0
Created for: Udacity Fullstack Nanodegree
Description: Creates google map for the golf course app and creates markers
for the map. It also animates the markers and populates two info windows for the
markers with FourSquare and Weather Underground data.*/

var map, courseInfoWindow, weatherInfoWindow, streetViewImage;
var courseMarkerArray = [];

//This function is called if google maps does not load properly.
var googleError = function() {
	alert("Monterey Golf Map did not load properly, try restarting app!!");
};

//Creates custom Google Maps map for the Monterey Peninsula.
var initGolfMap = function() {
	var mapSettings = {
		center: new google.maps.LatLng(36.582308, -121.871688),
		mapTypeId: google.maps.MapTypeId.HYBRID,
		panControl: true,
		zoomControl: true,
		streetViewControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
		},
		mapTypeControl: false,
		scaleControl: false,
		overviewMapControl: true
	};
	map = new google.maps.Map(document.getElementById('map'), mapSettings);

	//Sets map zoom according to screen width. This makes the couse marker icons more
	//usable on smaller screens.
	var windowSize = window.matchMedia("(min-width: 768px)");
	if (windowSize.matches) {
		map.setZoom(12);
	} else {
		map.setZoom(11);
	}

	//Defines infowindows for the map markers.
	courseInfoWindow = new google.maps.InfoWindow({
		maxWidth: 550
	});
	weatherInfoWindow = new google.maps.InfoWindow({
		maxWidth: 350
	});

	//Passes the new map and golf course data model to the createCourseMarker function.
	createCourseMarkers(map, golfCourses);
};

//Builds courseMarker array of golf course markers for the map using the golfCourses
//data model from course-data-model.js file in the js directory.
var createCourseMarkers = function(map, courseList) {
	for (var i = 0; i < courseList.length; i++) {
		courseList[i].index = i;
		var course = courseList[i];
		var courseMarker = new google.maps.Marker({
			position: {
				lat: course.latlng[0],
				lng: course.latlng[1]
			},
			map: map,
			name: course.name,
			index: i
		});
    //Sets courseMarker icon orange by default.
		courseMarker.setIcon('https://maps.google.com/mapfiles/ms/icons/orange-dot.png');
		courseMarkerArray.push(courseMarker);
		addCourseMarkerAnimationInfo(map, courseMarker, course);
	}
};

// Adds animation and api data to the golf course markers.
var addCourseMarkerAnimationInfo = function(map, courseMarker, course) {
	courseMarker.addListener('click', function() {
    //Offsets courseMarker from center so that infowindows appear centered.
		var windowSize = window.matchMedia("(max-height: 732px)");
		if (windowSize.matches) {
			var lat = courseMarker.getPosition().lat() + .07;
			var lng = courseMarker.getPosition().lng();
		} else {
			var lat = courseMarker.getPosition().lat() + .04;
			var lng = courseMarker.getPosition().lng();
		}
    map.setCenter({lat: lat, lng: lng});
    //Bounces courseMarker on click.
		courseMarker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			courseMarker.setAnimation(null);
		}, 1400);
    //Turns courseMarker icon from orange to green on click.
		courseMarker.setIcon('https://maps.google.com/mapfiles/ms/icons/green-dot.png');
    //Asynchronously gets course api content and sets infowindows on click.
		FoursquareCourseData(course);
		WeatherUndergroundCourseData(course);
		courseInfoWindow.open(map, this);
		weatherInfoWindow.open(map, this);
	});
};

//Adds markers to the golf course map using Google Maps api setMap module.
var addCourseMarkersToMap = function(map) {
	for (var i = 0; i < courseMarkerArray.length; i++) {
		courseMarkerArray[i].setMap(map);
	}
};

//Hides markers on the golf course map using Google Maps api setVisible module.
var hideCourseMarkers = function(map) {
	for (var i = 0; i < courseMarkerArray.length; i++) {
		courseMarkerArray[i].setVisible(false);
	}
};

//Show all markers on the golf course map using Google Maps api setVisible module.
var showCourseMarkers = function(map) {
	for (var i = 0; i < courseMarkerArray.length; i++) {
		courseMarkerArray[i].setVisible(true);
	}
};

//Triggers animation and twp info windows for golf course marker when course marker
//is clicked.
var triggerCourseMarkerAnimation = function(map, courseMarker) {
	google.maps.event.trigger(courseMarker, 'click');
};
