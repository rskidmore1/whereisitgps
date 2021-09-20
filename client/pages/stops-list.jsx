import React from 'react';

import MapList from './components/list-map';

export default class TripsList extends React.Component {
  constructor(props) {
    super(props);
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    this.state = {
      stopsList: [],
      hover: false,
      mapCoords: {}
    };
    fetch('/api/stopslist')
      .then(res => res.json())
      .then(result => {

        this.setState({ stopsList: result });
      })
      .catch(err => {
        console.error(err);
      });
  }

  onMouseEnterHandler(event) {
    this.setState({ hover: true });
    this.state.stopsList.map(stop => {
      if (String(stop.stopId) === event.currentTarget.id) {
        // console.log(((new Date(stop.beginTime).getTime() - new Date(stop.endTime).getTime()) / 1000) / 60);
        return this.setState({ mapCoords: { lat: Number(stop.stopLocation.lat), lng: Number(stop.stopLocation.lng) } });
      }
      return null;
    });

  }

  onMouseLeaveHandler(event) {
    this.setState({ hover: false });
  }

  render() {

    return (

      <React.Fragment>
        <div className="two-third">
          {this.state.stopsList.map(stop =>
            <div onMouseEnter={this.onMouseEnterHandler}
              onMouseLeave={this.onMouseLeaveHandler}
              key={stop.stopId} id={stop.stopId} className="box-two-thirds font-regular blue-text list-margin list-padding"
            >

              <a href={'#stopprofile?stopId=' + stop.stopId} className="nav-a">
                <table>
                  <tbody>
                    <tr>
                      <td className=" blue-text">Stop location:</td>
                      <td className=" blue-text">{JSON.stringify(stop.stopLocation)} </td>
                    </tr>
                    <tr>
                      <td className=" blue-text">vehicle: </td>
                      <td className=" blue-text">{stop.vehicleId}</td>

                    </tr>
                    <tr>
                      <td className=" blue-text">Duration: </td>
                      <td className=" blue-text">{((new Date(stop.beginTime).getTime() - new Date(stop.endTime).getTime()) / 1000) / 60 }</td>

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

              <MapList coords={this.state.mapCoords} />
            </div>
          </div>
        </div>
      </React.Fragment>

    );
  }
}
