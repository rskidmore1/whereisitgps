import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class LiveMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      demoRoutes: [],
      demoRoutesMaxCount: 0,
      demoCount: 0,
      mapCenter: {
        lat: 25.774,
        lng: -80.190
      },
      vehicles: [{
        vehicleId: 1,
        coords: {
          lat: 25.774,
          lng: -80.190
        }
      }, {
        vehicleId: 2,
        coords: {
          lat: 24.774,
          lng: -80.190
        }
      }]
    };

    fetch('/api/demoroutes')
      .then(res => res.json())
      .then(result => {

        let routesArr = [];
        const demoRoutesArr = [];
        this.setState({ demoRoutesMaxCount: result.rows[0].demoRoute.gpx.trk[0].trkseg[0].trkpt.length });
        for (let i = 0; i < result.rows.length; i++) {
          for (let j = 0; j < result.rows[0].demoRoute.gpx.trk[0].trkseg[0].trkpt.length; j++) {
            routesArr.push(result.rows[i].demoRoute.gpx.trk[0].trkseg[0].trkpt[j].ATTR);

          }

          demoRoutesArr.push(routesArr);
          routesArr = [];
        }
        this.setState({ demoRoutes: demoRoutesArr });
      })
      .catch(err => {
        console.error(err);
      });

  }

  startVehicleUpdates() {
    let demoCount = this.state.demoCount;

    setInterval(() => {

      demoCount++;
      this.setState({ demoCount: demoCount });
      const demoRoutesMaxCount = this.state.demoRoutesMaxCount;

      const updatedVehicles = this.state.vehicles.map((vehicle, index) => {

        return Object.assign({}, vehicle, { coords: { lat: this.state.demoRoutes[index][demoCount].lat, lng: this.state.demoRoutes[index][demoCount].lon } });
      });
      this.setState({ vehicles: updatedVehicles });

      if (demoCount === demoRoutesMaxCount) {
        this.setState({ demoCount: 0 });
      }
    }, 2000
    );

  }

  componentDidMount() {
    this.startVehicleUpdates();
  }

  render() {

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    };

    return (
      <div>

        <div className="map-div">
          <Map

            google={this.props.google}
                containerStyle={containerStyle}
            initialCenter={this.state.mapCenter}
            zoom={10} >

            {this.state.vehicles.map(vehicle =>
                  <Marker key={vehicle.vehicleId}
                  position={{ lat: vehicle.coords.lat, lng: vehicle.coords.lng }}
                  />
            )}

          </Map >
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyA9pD-yx8UXTtmNTaIfo8vzomK38m8U5LM')

})(LiveMap);
