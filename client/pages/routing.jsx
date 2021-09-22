import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';

class Routing extends React.Component {

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

    fetch(`/api/vehicleinfo/${this.props.vehicleId}`)
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
      <div>

        <div className="blue-box rounted-box margin-top-2rem center-mobile margin-left-offset-mobile">
          <p className="blue-text font-regular">Vehicle: {this.state.vehicle.name}</p>
        </div>

        <div className="map-div margin-top-1rem margin-left-offset-mobile">
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

        <div className=' route-alert-div  blue-box rounted-box margin-top-1rem margin-left-offset-1rem-mobile box-padding '>
          <div className="row center ">

            <div className="">
              <button className="save-button blue-text  " onClick={this.sendText} >Send</button>

            </div>

            <div className="">
              <table className="route-check-boxes">
                <tbody>
                  <tr>
                    <td><input className="check-box" type="checkbox"></input></td>
                    <td> <label>Text</label></td>
                  </tr>
                  <tr>
                    <td><input className="check-box" type="checkbox"></input></td>
                    <td> <label>Email</label></td>
                  </tr>
                </tbody>
              </table>

            </div>
            <a href={this.state.link}>{this.state.link}</a>
          </div>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyA9pD-yx8UXTtmNTaIfo8vzomK38m8U5LM')

})(Routing);
