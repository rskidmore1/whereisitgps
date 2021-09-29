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

          <div className=" blue-box  box-padding blue-text rounted-box driver-info-margin">

            <div className=" margin-top-1rem  blue-text ">

                <div className="row driver-info-row " >
                  <div className="width-50 vehicle-info-col">
                    <table>
                      <tbody>
                        <tr>
                          <td>Stop Location: </td>
                        <td> {'Lat: ' + JSON.stringify(stopLocation.lat)} deg<br></br>{'Lng: ' + JSON.stringify(stopLocation.lng)} deg</td>

                        </tr>
                        <tr>
                          <td>Vehicle: </td>
                          <td>Truck{vehicleId} </td>
                        </tr>
                        <tr>
                          <td>Duration: </td>
                        <td>{((new Date(beginTime).getTime() - new Date(endTime).getTime()) / 1000) / 60} minutes</td>
                        </tr>
                      </tbody>
                    </table>

                  </div>

                </div>

            </div>
          </div>
      </div>
      <div className="one-third ">
        <div className="stop-profile-map-mobile ">
          <MapList coords={this.state.stop.stopLocation} />
        </div>

        </div>

      </React.Fragment>
    );
  }
}
