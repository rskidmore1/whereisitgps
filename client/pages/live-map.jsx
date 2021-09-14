import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class LiveMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dailyRoutes: [],
      maxIncrease: 0,
      totalVehicles: 0,
      count: 0,
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
    fetch('/api/dailyroutes')
      .then(res => res.json())
      .then(result => {

        let routesArr = [];
        const dailyRoutesArr = [];
        this.setState({ totalVehicles: result.rows.length });
        this.setState({ maxIncrease: result.rows[0].dailyRoute.gpx.trk[0].trkseg[0].trkpt.length });
        for (let i = 0; i < result.rows.length; i++) {
          for (let j = 0; j < result.rows[0].dailyRoute.gpx.trk[0].trkseg[0].trkpt.length; j++) {
            routesArr.push(result.rows[i].dailyRoute.gpx.trk[0].trkseg[0].trkpt[j].ATTR);

          }

          dailyRoutesArr.push(routesArr);
          routesArr = [];
        }
        this.setState({ dailyRoutes: dailyRoutesArr });
      })
      .catch(err => {
        console.error(err);
      });

  }

  count() {
    let increase = this.state.count;

    setInterval(() => {

      increase++;
      this.setState({ count: increase });
      const maxIncrease = this.state.maxIncrease;

      const totalVehicles = this.state.vehicles.length;

      for (let i = 0; i < totalVehicles; i++) {
        const newCoords = this.state.vehicles[i];

        newCoords.coords.lat = this.state.dailyRoutes[i][increase].lat;
        newCoords.coords.lng = this.state.dailyRoutes[i][increase].lon;

        this.setState(newCoords);
      }

      if (increase === maxIncrease) {
        increase = 0;
      }
    }, 2000
    );

  }

  componentDidMount() {
    this.count();
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

            {this.state.vehicles.map(item =>

                  <Marker key={item.vehicleId}
                  position={{ lat: item.coords.lat, lng: item.coords.lng }}
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
