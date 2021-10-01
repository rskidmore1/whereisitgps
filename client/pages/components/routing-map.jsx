import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';

class RoutingMap extends React.Component {

  constructor(props) {
    super(props);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.sendText = this.sendText.bind(this);

    this.state = {
      vehicleLocation: {
        lat: 33.91696347,
        lng: -117.88405129
      },
      route: [],
      counter: 1,
      vehicle: {},
      link: ''
    };

  }

  onMapClicked(mapProps, map, clickEvent) {

    const event = clickEvent;
    const point = { counter: this.state.counter, coords: { lat: event.latLng.lat(), lng: event.latLng.lng() } };
    const routeArr = this.state.route;
    routeArr.push(point);
    this.setState({ route: routeArr });
    const counter = this.state.counter + 1;
    this.setState({ counter: counter });

  }

  sendText() {

    let link = 'https://www.google.com/maps/dir/';
    for (let i = 0; i < this.state.route.length; i++) {
      link = `${link}${this.state.route[i].coords.lat},${this.state.route[i].coords.lng}/`;
    }

    this.setState({ link: link }, () => {

      const message = `
        Name: Ryan
        Route:
        ${this.state.link}
    `;
      const text = { toNumber: '+16192025415', message: message };

      fetch('/api/sendtext/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },

        body: JSON.stringify(text)
      })
        .then(response => response.json())
        .catch(error => {
          console.error('Error:', error);
        });

    });

  }

  render() {

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    };

    return (
      <React.Fragment>
        <div className="map-div margin-top-1rem ">
          <Map
                google={this.props.google}
                containerStyle={containerStyle}
                initialCenter={this.state.vehicleLocation}
                zoom={10}
                mapTypeControl={false}
                scaleControl={false}

                zoomControl={false}
                fullscreenControl={false}

                onClick={this.onMapClicked}>

                {this.state.route.map(item =>
                    <InfoWindow key={item.counter} position={{ lat: item.coords.lat, lng: item.coords.lng }} visible={true}>
                      <div className="blue-text">
                        <p>Stop {item.counter}</p>
                      </div>
                    </InfoWindow>
                )}
              </Map >
          </div>
          <div>
            <button className="save-button blue-text mobile-center send-button-margin-top" onClick={this.sendText}>Text To Driver</button>
          </div>
          <a href={this.state.link}>{this.state.link}</a>

      </React.Fragment>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.GOOGLE_MAPS_TOKEN)

})(RoutingMap);
