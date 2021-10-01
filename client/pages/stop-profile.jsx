import React from 'react';
import MapList from './components/list-map';

export default class StopProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stop: {
        stopLocation: {},
        vehicleId: 0,
        beginTime: null,
        endTime: null
      },
      stopId: this.props.stopId,
      isLoaded: false,
      networkError: ''

    };

    fetch(`/api/stop/${this.props.stopId}`)
      .then(res => res.json())
      .then(result => {
        if (!result) {
          this.setState({ networkError: 'Results are empty.' });
        } else {
          this.setState({ stop: result, isLoaded: true });
        }

      })
      .catch(err => {
        this.setState({ isLoaded: true, networkError: 'Load failed. Please try again' });
        console.error(err);
      });

  }

  render() {

    const { stopLocation, vehicleId, beginTime, endTime } = this.state.stop;
    return (
      <React.Fragment>
      <div className="two-third  ">
          <div className={this.state.isLoaded ? 'summon-spinner lds-circle center hidden' : 'summon-spinner lds-circle center '}>
            <div ></div>
          </div>
          <p>{this.state.networkError}</p>

          <div className="box-two-thirds  vehicle-list-item  blue-text list-margin list-padding " >

              <table>
                <tbody>

                  <tr>
                    <td className=" blue-text font-heavy list-item-right-padding">Vehicle: </td>
                    <td className=" blue-text list-bottom-padding">Truck{vehicleId}</td>

                  </tr>
                  <tr>
                    <td className=" blue-text font-heavy list-item-right-padding">Duration: </td>
                    <td className=" blue-text list-bottom-padding">{((new Date(beginTime).getTime() - new Date(endTime).getTime()) / 1000) / 60} minutes</td>

                  </tr>
                  <tr>
                    <td className=" blue-text font-heavy list-item-right-padding">Address:</td>
                  </tr>

                </tbody>

              </table>
              <table>
                <tbody>
                  <tr>
                    <td className=" blue-text ">lat: {stopLocation.lat}&deg; lng: {stopLocation.lng} &deg; </td>
                  </tr>
                </tbody>
              </table>

          </div>
          <div className="stop-profile-map-desktop">
            <MapList coords={this.state.stop.stopLocation} />
          </div>
      </div>
      <div className="one-third stop-profile-map-div">

        <div className="stop-profile-map-mobile center">
          <MapList coords={this.state.stop.stopLocation} />
        </div>

      </div>

      </React.Fragment>
    );
  }
}
