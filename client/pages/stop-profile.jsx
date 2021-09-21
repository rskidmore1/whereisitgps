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
      stopId: this.props.stopId

    };

    fetch(`/api/stop/${this.props.stopId}`)
      .then(res => res.json())
      .then(result => {

        this.setState({ stop: result });

      });

  }

  render() {

    const { stopLocation, vehicleId, beginTime, endTime } = this.state.stop;
    return (
      <React.Fragment>
      <div className="two-third  ">

          <div className=" blue-box font-regular box-padding blue-text rounted-box driver-info-margin">

            <div className=" driver-info-edit font-regular blue-text ">

                <div className="row driver-info-row " >
                  <div className="width-50 vehicle-info-col">
                    <table>
                      <tbody>
                        <tr>
                          <td>Stop Location: </td>
                        <td>{JSON.stringify(stopLocation)}</td>
                        </tr>
                        <tr>
                          <td>Vehicle: </td>
                          <td>{vehicleId} </td>
                        </tr>
                        <tr>
                          <td>Duration: </td>
                        <td>{((new Date(beginTime).getTime() - new Date(endTime).getTime()) / 1000) / 60}</td>
                        </tr>
                      </tbody>
                    </table>

                  </div>

                </div>

            </div>
          </div>
      </div>
      <div className="one-third ">
          <MapList coords={this.state.stop.stopLocation} />

        </div>

      </React.Fragment>
    );
  }
}
