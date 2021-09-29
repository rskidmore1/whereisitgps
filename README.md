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

### Features
* Live maps: view vehicles current location
* Vehicles
  * List: view name, make, model, and location on map
  * Profile: View and edit name, year, make, model, color, and plate number. 
  * Picture: Upload and view picture 
* Routing: 
  * Clickable map: Click on google maps window to add GPS coordinates to a list of GPS coordinates
  * Text: Send route to user and admin
* Alerts
  * Speeding: Get text and/or email alert 
* Stops
  * List: View list of stops location, vehicle name, stop duration, and pin location on map
  * Profile: View stop location, vehicle name, stop duration, and pin location on map

### Gifs
![deepin-screen-recorder_chromium-browser_20210928174352](https://user-images.githubusercontent.com/11698908/135184255-62c4ceeb-4d96-4d9b-99a1-efa9249d12a7.gif)
![deepin-screen-recorder_chromium-browser_20210928174216](https://user-images.githubusercontent.com/11698908/135184257-6bb8801b-7f5d-42e1-8c27-e9c862965a8d.gif)

### Stretch Features
* Convert UI to Material UI
* Replace GPS coordinates with addresses
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
