/*course-view-model.js
Created By: Lee Farretta
Project Name: Lee's Monterey Golf Map
Release Date: 7/27/17
Version: 1.0
Created for: Udacity Fullstack Nanodegree
Description: Provides the Knockout view model for the golf course app.*/

//Defines view model function and ko obvservable variables for the golf app.
var ViewModel = function() {
	var self = this;
	self.courseList = ko.observableArray([]);
	self.userSearchString = ko.observable('');
	self.courseData = ko.observable('');

	//Populates ko observable array courseList with data from golfCourses data model.
	for (var i = 0; i < golfCourses.length; i++) {
		self.courseData = golfCourses[i];
		self.courseList.push(self.courseData);
	}

	//Filters course list and course markers based on user input in the search bar.
	//The key to making this work is using the knockout subscribe method.
	self.userSearchString.subscribe(function(searchString) {
		//Executes filter code if string is entered into the search bar.
		if (searchString !== '') {
			//Clears courseList observable array.
			self.courseList.removeAll();
			//Goes through each course in the golfCourses data model and compares its
			//name to the user input in the search bar.
			for (var i = 0; i < golfCourses.length; i++) {
				self.courseData = golfCourses[i];
				var courseName = self.courseData.name;
					//If search string matches any part of the course name, the course name is
					//added to the filtered list of coures.
					if (courseName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
						self.courseList.push(self.courseData);
					}
			};
			//Clears course markers from google maps and adds the new filtered courseMarker
			//array based on the search results.
			deleteCourseMarkers();
			createCourseMarkers(map, self.courseList());
		} else {
			//If searchString is blank, courseList array is cleared and loaded with
			//all golf course objects from tthe golfCourses data model.
			self.courseList.removeAll();
			for (var i = 0; i < golfCourses.length; i++) {
				self.courseData = golfCourses[i];
				self.courseList.push(self.courseData);
			}
			//Removes courseMarkers from course map and refreshes them.
			deleteCourseMarkers();
			createCourseMarkers(map, self.courseList());
		}
	});

	//Triggers animation and two info windows for courseMarker when name of marker
	//is clicked on in the DOM course list.
	self.courseMarkerAnimation = function(courseMarker) {
		triggerCourseMarkerAnimation(map, courseMarkerArray[courseMarker.index]);
	};
};

//Applies bindings to the golfCourseViewModel.
var golfCourseViewModel = new ViewModel();
if (golfCourseViewModel) {
	ko.applyBindings(golfCourseViewModel);
} else {
	alert("ViewModel for golf course app did not load properly, try restarting app!!");
}
