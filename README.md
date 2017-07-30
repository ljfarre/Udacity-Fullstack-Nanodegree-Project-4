# Lee's Monterey Golf Map
This Udacity neighboerhood map project submission has been adapted to the golf
course experience in the Monterey, Ca area.  It includes courses in Monterey,
Pacific Grove, Carmel by the Sea and the Carmel Valley.  While not all the
courses in the geographic area are listed, most of the top public and private
courses are featured; including the top picks in the Del Monte forest within
the seventeen mile drive. The following URL should now take you to Lee's Monterey
Golf Map: [Launch Map](https://rawgit.com/ljfarre/Udacity-Fullstack-Nanodegree-Project-4/master/course-view.html)

## Table of Contents
1. Introduction
2. Basic Requirements
3. Installing and Running Lee's Monterey Golf Map
4. Testing Lee's Monterey Golf Map
5. Code Verification and Organization
6. References

### Introduction
The goal of this site is develop a neighborhood map template that can be tuned
and reused for many different types of neighborhood experiences.  The design was
kept simple, and as clean and responsive as possible.  The key design decision
was to keep the interface the same regardless of platform. Some thought was given
to using a pull down or hamburger menu for the course list, but that was shelved
for now.  When this app is ported to Swift or an Android platform specifically,
this decision will be revisited.

Using the map is straight forward. To get details on a course, you can either
click on a course icon or click on it's name in the course list to the right
or below the map depending on device you are using. To refresh the map, click
the map refresh button in the upper right corner of the window. To search for a
course, type part of the course name and the course list and the icons on the map
will only include course names that include your search text. You can also book
tee-times using the GolfNow button next to the refresh button. Keep in mind that
GolfNow now does not have all the Monterey area courses listed here, but it is
the best overall golf booking system and api that I have found.

The neighborhood map content is driven by the following application programming
interfaces (apis): Google Maps, FourSquare, Weather Underground, Yelp and Golf
Now.  The primary asynchronous content for the map is delivered by Google Maps,
FourSquare and Weather Underground.  Yelp and Golf Now provide supplemental
external links for a richer user experience, but they are outside of the Rubric
requirements for the course. Ultimately, the asynchronous content decisions were
determined by how much content could fit on the screen and info windows across
the different screen type and still look and feel decent from a user perspective.

### Basic Requirements
There are some basic requirements for this map to function properly.  These
requirements assume that you are developing in a Windows 10 environment and
that you are using Git and Git Bash.  They are as follows:

1. Make sure you are connected to the internet.  While there are static
files in directories, some of the methods and scripts are pulled in from the
web.
2. Make sure Git is installed on your Windows 10 machine.  If you don't have
it download it using the following URL: [download Git from git-scm.com.](http://git-scm.com/downloads)
3. Install Git in the directory where you want to install the Monterey Golf Map app.

### Installing and Running Lee's Monterey Golf Map
After Git is installed, you are ready to download the app onto your local machine.  
The following steps should complete this process:

1. Open a Git Bash shell and navigate to the directory where you want to install
the subdirectory for the map application.  You are now ready to fetch
the source code for the neighborhood map project. From the
terminal, run:

    git clone https://github.com/ljfarre/Udacity-Fullstack-Nanodegree-Project-4.git golfmap

This will give you a directory named **golfmap** complete with the required source
code, and supporting directories and modules for Lee's Monterey Golf Map.  

2. Using windows file explorer, go to the golfmap directory referenced above and
double click on the course-view.html file.  This will launch Lee's Monterey Golf Map.
3. You should now be able to test the golf map in your browser.

### Testing Lee's Monterey Golf Map
Once the golf map has launched successfully, it's functions can be tested.
This app was tested using a Chrome browser primarily. The simulated platforms
provided within Chrome's developer tools were utilized to test the app for
responsiveness. The following is a high level test suite:

1. Test the refresh button at the top right of the screen periodically as you
go through the courses on the map to get a fresh version of the map.  As you view
courses the map icons go from orange to green.  Green illustrates that the course
has been viewed in the current session.  Once you refresh the map, all the icons
go back to orange signifying that the courses have not yet been reviewed.
2. Test the GolfNow button.  This should take you to the GolfNow site where you
can book tee-times at some of the Monterey courses and wherever else you may
want to play.  Keep in mind that GolfNow does not include all the courses featured
in this map.
3. To see asynchronous course information, click on one of the map icons or a
course name from the course list at the right or bottom of the screen depending on
what platform you are viewing from. The course data is rendered by FourSquare and the
weather is rendered by Weather Underground.  I layered two info windows on top of
each other to rendered the content so it fit decently on all screen types and sizes.
4. Within the course data info window, there is also an external link to Google
maps drivng directions for the selected course.
5. Below each course name in the course list, there is an external link to Yelp for
the selected course.  This link was provided by the Yelp fusion api and then loaded
into the data model for the app.
6. Test the app for responsiveness using the simulated platforms in Chrome's
developer tools. The app interface should stay consistent and usable.  Only the
GolfNow button disappears when the screen width becomes too narrow.  The media
screen capability within css was used to provide fairly granular and simple
responsiveness for this app.
7. Test the footer links to make sure they work.

### Code Verification and Organization
Every effort was made to verify the code for this project. The
course-view html file was checked with Nu Html Checker. Style.css file was
verified with W3C css validator. All the custom java script files in the js directory
were tested with Beautify Tools JS validator.

An additional note on code organizations is warranted.  In the spirit of following
the Model–view–viewmodel (MVVM) architectural pattern, the code was factored to
follow this pattern as much as possible.  In addition the, api code was factored
into separate files so that it can be clearly identified and reviewed.

### References
This neighborhood map was pieced together using Udacity class materials and code from
class assignments.  Additional web based research was required in the following areas:

* Java Script
* Knockout/MVVM Pattern
* jQuery Ajax Methods
* getJSON Patterns
* Google Maps APIs
* FourSquare API
* Weather Underground API
* Yelp Fusion API  
* GolfNow API
* Responsive Design
