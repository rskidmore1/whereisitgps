# Whereisit GPS

### Description 
A web application for business owner who want to track their vehicles and manage their drivers in real time. 

### Why build this?
I know this product really well. Look at my resume. You'll understand why. I love cars. I like software that plays in the real and digital world (as a hobby mostly). With domain knowledge on lock, I could focus on the process of building a full stack application. React really came to life. Node made bouncing from frontend to backend seemless. It was a really fun project. Also I'm not aware of a complete, out of the box fleet mananger built with contemporary stack quite like this, just on github, that isn't intended to be a modular piece of something else. This is approaching a functional beta product. I'm reasonably certain users would pay for a system lke this although I have no intention follow that path with this product. This was just for the boot camp. 

### Live Link 
[Heroku](https://whereisitgps.herokuapp.com/?)

### Technologies
* React: Pages and Components 
  * State: To data around classes
  * Props: To pass data to components
  * Used map() to create list views from api data
  * Used hashrouting to create page navigation
* google-maps-react: creates the Live Map and list maps
  * Used click event to create the Routing feature
  * Used setInterval() to create an updating live map 
* Node
  * Used fetch() to make api calls to update from end 
* NPM
  * Used to easily create frontend and backend in one directory
* Twilio
  * Used to send text notifications to drivers and admins
* xml2js
  * Converted .gpx files in useable JSON data
* Express.js
  * Created web server in NPM environment 
* PostgreSQL
  * Stored user, trip, stop, and live data for live map and profile views
* Heroku
  * Deployed live version online
