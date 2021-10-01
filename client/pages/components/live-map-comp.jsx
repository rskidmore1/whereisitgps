import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class LiveMapComp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      networkError: '',
      demoRoutes: [],
      timerId: 0,
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
      },
      {
        vehicleId: 4,
        coords: {
          lat: 33.91696347,
          lng: -117.88405129
        },
        movedAt: null,
        stopped: false,
        stoppedTimer: 0
      },
      {
        vehicleId: 5,
        coords: {
          lat: 33.91696347,
          lng: -117.88405129
        },
        movedAt: null,
        stopped: false,
        stoppedTimer: 0
      },
      {
        vehicleId: 6,
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
        if (!result) {
          this.setState({ networkError: 'Results are empty.' });
        } else {
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
          this.setState({ demoRoutes: demoRoutesArr, isLoaded: true });
        }
      })
      .catch(err => {
        this.setState({ networkError: 'Load failed. Please try again', isLoaded: true });
        console.error(err);
      });

  }

  startVehicleUpdates() {

    const timerId = setInterval(() => {
      let demoCount = this.state.demoCount;
      demoCount++;
      this.setState({ demoCount: demoCount });
      this.setState({ timerId: timerId });
      const demoRoutesMaxCount = this.state.demoRoutesMaxCount;

      const updatedVehicles = this.state.vehicles.map((vehicle, index) => {

        let timeStamp = vehicle.movedAt;
        let stopped = vehicle.stopped;

        if (demoCount >= demoRoutesMaxCount) {
          this.setState({ demoCount: 0 });
        }

        if (vehicle.coords.lat !== this.state.demoRoutes[index][demoCount].lat && vehicle.coords.lng !== this.state.demoRoutes[index][demoCount].lon) {
          stopped = false;
          timeStamp = Date.now();
        } else if (timeStamp + 1000 <= Date.now()) {
          stopped = true;
        }
        return Object.assign({}, vehicle, { coords: { lat: this.state.demoRoutes[index][demoCount].lat, lng: this.state.demoRoutes[index][demoCount].lon }, movedAt: timeStamp, stopped: stopped });
      });
      this.setState({ vehicles: updatedVehicles });

    }, 2000
    );

  }

  componentDidMount() {

    this.startVehicleUpdates();
  }

  componentWillUnmount() {
    const timerId = clearInterval(this.state.timerId);
    this.setState({ timerId: timerId });
  }

  render() {

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    };

    return (
      <React.Fragment>
        <div className="map-div  rounted-box mobile-center ">
          <div className={this.state.isLoaded ? 'summon-spinner lds-circle center hidden' : 'summon-spinner lds-circle center '}>
            <div ></div>
          </div>
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
          <p>{this.state.networkError}</p>
        </div>

      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.GOOGLE_MAPS_TOKEN)

})(LiveMapComp);
