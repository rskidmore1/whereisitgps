import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';

class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.makeRouteURL = this.makeRouteURL.bind(this);
    this.state = {
      vehicleLocation: {
        lat: 40.854885,
        lng: -88.081807
      },
      route: [],
      counter: 1,
      vehicle: {}
    };

    const vId = 2;
    fetch(`/api/vehicleinfo/${vId}`)
      .then(res => res.json())
      .then(result => {
        this.setState({ vehicle: result });
      });

  }

  onMapClicked(mapProps, map, clickEvent) {

    const event = clickEvent;
    const point = { counter: this.state.counter, coords: { lat: event.latLng.lat(), lng: event.latLng.lng() } };
    const routeArr = this.state.route;
    routeArr.push(point);
    this.setState({ route: routeArr });
    const counter = this.state.counter + 1;
    this.setState({ counter: counter });
    this.forceUpdate();

  }

  makeRouteURL() {
    let link = 'https://www.google.com/maps/dir/';
    for (let i = 0; i < this.state.route.length; i++) {
      link = `${link}${this.state.route[i].coords.lat},${this.state.route[i].coords.lng}/`;
    }

  }

  render() {

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    };

    return (
      <div>

        <div>
          <p>Vehicle: {this.state.vehicle.name}</p>
        </div>

        <div className="map-div">
          <Map
            google={this.props.google}
                containerStyle={containerStyle}
            initialCenter={this.state.vehicleLocation}
            zoom={10}

            onClick={this.onMapClicked}>

            {
              this.state.route.map(item =>

                <InfoWindow key={item.counter} position={{ lat: item.coords.lat, lng: item.coords.lng }} visible={true}>
                  <div className="blue-text">
                      <p>Stop {item.counter}</p>
                    </div>
                  </InfoWindow>

              )}

          </Map >
        </div>

        <div>
          <button className="save-button blue-text" onClick={this.makeRouteURL}>send route</button>
        </div>
              <div></div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyA9pD-yx8UXTtmNTaIfo8vzomK38m8U5LM')

})(Routing);
