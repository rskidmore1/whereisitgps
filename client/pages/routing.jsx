import React from 'react';
import RoutingMap from './components/routing-map';

export default class Routing extends React.Component {

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

    return (
      <div className="two-third">
        <div className="center">

          <RoutingMap vehicleLocation={this.state.vehicleLocation} />
        </div>

      </div>
    );
  }
}
