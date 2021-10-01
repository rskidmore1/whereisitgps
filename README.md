# Whereisit GPS

### Description 
A web application for business owners who want to track their vehicles and manage their drivers in real time. 

### Why build this?
I know this product really well. And I have a experience in the industry. I love cars. I like software that plays in the real and digital world (as a hobby mostly). With solid domain knowledge, I could focus solely on the process of building a full stack application. React really came to life. Node made bouncing from frontend to backend seamless. It was a really fun project. Also I'm not aware of a complete, out of the box fleet manager built with a contemporary stack quite like this, just on github, that isn't intended to be a modular piece of something else. Over all, I'm very happy with it. 

### Live Link 
[Heroku](https://whereisitgps.herokuapp.com/?)

### Technologies
* React 
  * Pages and Components 
  * State: To pass data around classes
  * Props: To pass data to components
  * Used map() to create list views from api data
  * Used hashrouting to create page navigation
* google-maps-react 
  * Creates the Live Map and list maps
  * Used onClick events to store GPS coordinates to state for the Routing feature
  * Used setInterval() to create an updating live map 
* react-geocode 
  * Converts GPS coordinates into a street address
* Node
  * Used fetch() to make API calls to update frontend 
* NPM
  * Used to easily create frontend and backend in one directory
* Twilio
  * Used to send text notifications to drivers and admins
* xml2js
  * Converted .gpx files into JSON data
* Express.js
  * Created web server in NPM environment 
* PostgreSQL
  * Stored user, trip, stop, and live data for live map and profile views
* Heroku
  * Deployed live version online

### Features
* Live maps 
  * View vehicles current location
* Vehicles
  * List: View name, make, model, and location on map
  * Profile: View and edit name, year, make, model, color, and plate number. 
  * Picture: Upload and view picture 
* Routing
  * Clickable map: Click on Google Maps window to add GPS coordinates to a list of GPS coordinates
  * Text: Send route to user and admin
* Alerts
  * Speeding: Get text and/or email alert 
* Stops
  * List: View list of stops location, vehicle name, stop duration, and pin location on map
  * Profile: View stop location, vehicle name, stop duration, and pin location on map

### Gifs
![deepin-screen-recorder_Select area_20211001155718](https://user-images.githubusercontent.com/11698908/135695547-9b244d43-4279-446f-bc37-b9d0473a0794.gif)
![deepin-screen-recorder_chromium-browser_20211001155537](https://user-images.githubusercontent.com/11698908/135695549-45a5c5a4-f59a-4b3e-a323-75917d55ad3b.gif)


### Stretch Features 
* Expanded Routing 
  * Search bar for address 
  * Reorder stops
  * Adding notes to stops
  * Selecting stop from Street View
* Routing history
  * Store routes for each vehicle 
  * Compare against routes actually taken by vehicles 
* Trips 

### System Requirement 
* OS: Mac, Windows, Linux
* Storge: 1 gig
* Memory: 512 mb
* Node: 14.16.0+

### Run it 
1. Clone GitHub repo 
2. `cd whereisitgps`
3. Run `npm i`
4. `cp .env.example .env`
5. Copy google maps api key and twilio credentials
6. `npm run db:import`
7. `npm run build`
8. View it at `localhost:3000`
