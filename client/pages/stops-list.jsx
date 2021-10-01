import React from 'react';

import MapList from './components/list-map';

import Geocode from 'react-geocode';
Geocode.setLanguage('en');
Geocode.setRegion('us');
Geocode.setLocationType('ROOFTOP');
Geocode.setApiKey(process.env.GOOGLE_MAPS_TOKEN);

export default class TripsList extends React.Component {
  constructor(props) {
    super(props);
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    this.state = {
      stopsList: [],
      hover: false,
      mapCoords: {},
      isLoaded: false,
      networkError: ''
    };
    fetch('/api/stopslist')
      .then(res => res.json())
      .then(result => {
        if (!result) {
          this.setState({ networkError: 'Results are empty.' });
        } else {

          const resultsArr = [];
          result.map(res =>
            Geocode.fromLatLng(res.stopLocation.lat, res.stopLocation.lng).then(
              response => {
                const address = response.results[0].formatted_address;
                res.stopAddress = address;
                resultsArr.push(res);
                this.setState({ stop: resultsArr, isLoaded: true });

              },
              error => {
                console.error(error);
              }
            )
          );

          this.setState({ stopsList: result, isLoaded: true });

        }
      })
      .catch(err => {
        this.setState({ isLoaded: true, networkError: 'Load failed. Please try again' });
        console.error(err);
      });
  }

  onMouseEnterHandler(event) {
    this.setState({ hover: true });
    const stop = this.state.stopsList.find(({ stopId }) => stopId === Number(event.currentTarget.id));
    this.setState({ mapCoords: { lat: Number(stop.stopLocation.lat), lng: Number(stop.stopLocation.lng) } });
  }

  onMouseLeaveHandler(event) {
    this.setState({ hover: false });
  }

  render() {

    return (

      <React.Fragment>
        <div className="two-third">
          <div className={this.state.isLoaded ? 'summon-spinner lds-circle center hidden' : 'summon-spinner lds-circle center '}>
            <div ></div>
          </div>
          <p>{this.state.networkError}</p>

          {this.state.stopsList.map(stop =>
            <div onMouseEnter={this.onMouseEnterHandler}
              onMouseLeave={this.onMouseLeaveHandler}
              key={stop.stopId} id={stop.stopId} className="box-two-thirds  vehicle-list-item  blue-text list-margin list-padding "
            >

              <a href={'#stopprofile?stopId=' + stop.stopId} className="nav-a">
                <table>
                  <tbody>

                    <tr>
                      <td className=" blue-text font-heavy list-item-right-padding">Vehicle: </td>
                      <td className=" blue-text list-bottom-padding">Truck{stop.vehicleId}</td>
                    </tr>
                    <tr>
                      <td className=" blue-text font-heavy list-item-right-padding">Duration: </td>
                      <td className=" blue-text list-bottom-padding">{((new Date(stop.beginTime).getTime() - new Date(stop.endTime).getTime()) / 1000) / 60 } minutes</td>
                    </tr>
                    <tr>
                      <td className=" blue-text font-heavy list-item-right-padding">Address:</td>
                    </tr>

                  </tbody>

                </table>
                <table>
                  <tbody>
                    <tr>
                      <td className=" blue-text ">{stop.stopAddress} </td>

                    </tr>

                  </tbody>
                </table>
              </a>

            </div>
          )}

        </div>
        <div className="one-third ">
          <div className="center">
            <div className={this.state.hover ? '' : ' hidden'}>
            <div className="list-map-margin">
                {this.state.mapCoords ? <MapList coords={this.state.mapCoords} /> : 'map not loading'}

            </div>
            </div>
          </div>
        </div>
      </React.Fragment>

    );
  }
}
