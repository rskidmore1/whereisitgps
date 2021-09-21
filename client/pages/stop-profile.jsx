import React from 'react';
// import MapList from './components/list-map';

export default class StopProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stop: {},
      stopId: this.props.stopId

    };

    fetch(`/api/stop/${this.state.stopId}`)
      .then(res => res.json())
      .then(result => {

        this.setState({ stop: result });

      });

  }

  render() {

    const currentStop = Object.assign({}, this.state.stop);
    // console.log(currentStop);
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
                        {/* <td>lat: {currentStop.stopLocation.lat}<br></br> lng: {currentStop.stopLocation.lng} </td> */}
                        </tr>
                        <tr>
                          <td>Vehicle: </td>
                          <td>{currentStop.vehicleId} </td>
                        </tr>
                        <tr>
                          <td>Duration: </td>
                        <td>{((new Date(currentStop.beginTime).getTime() - new Date(currentStop.endTime).getTime()) / 1000) / 60}</td>
                        </tr>
                      </tbody>
                    </table>

                  </div>

                </div>

            </div>
          </div>
      </div>
      <div className="one-third ">
        {/* <MapList coords={currentStop.stopLocation} /> */}
        </div>

      </React.Fragment>
    );
  }
}
