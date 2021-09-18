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
        lat: 33.91696347,
        lng: -117.88405129
      },
      vehicles: [{
        vehicleId: 1,
        coords: {
          lat: 33.91696347,
          lng: -117.88405129
        },
        movedAt: null,
        stopped: false
      }, {
        vehicleId: 2,
        coords: {
          lat: 33.91696347,
          lng: -117.88405129
        },
        movedAt: null,
        stopped: false,
        stoppedTimer: 0
      },
      {
        vehicleId: 3,
        coords: {
          lat: 33.91696347,
          lng: -117.88405129
        },
        movedAt: null,
        stopped: false,
        stoppedTimer: 0
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

        let timeStamp = vehicle.movedAt;
        let stopped = vehicle.stopped;

        if (vehicle.coords.lat !== this.state.demoRoutes[index][demoCount].lat && vehicle.coords.lng !== this.state.demoRoutes[index][demoCount].lon) {
          stopped = false;
          timeStamp = Date.now();
        } else if (timeStamp + 42000 <= Date.now()) {
          stopped = true;
        }

        return Object.assign({}, vehicle, { coords: { lat: this.state.demoRoutes[index][demoCount].lat, lng: this.state.demoRoutes[index][demoCount].lon }, movedAt: timeStamp, stopped: stopped });
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
      <div className="two-third">

        <div className="map-div">
          <Map

            google={this.props.google}
            containerStyle={containerStyle}
            initialCenter={this.state.mapCenter}
            zoom={10} >

            {this.state.vehicles.map(vehicle =>

              <Marker key={vehicle.vehicleId}
                position={{ lat: vehicle.coords.lat, lng: vehicle.coords.lng }}
                icon={{
                  url: vehicle.stopped ? './images/Button_Icon_Red.svg' : './images/Green_icon.svg',
                  anchor: new window.google.maps.Point(10, 10),
                  scaledSize: new window.google.maps.Size(10, 10)
                }}
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
