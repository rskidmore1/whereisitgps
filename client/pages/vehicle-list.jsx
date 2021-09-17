import React from 'react';

import MapList from './components/list-map';

export default class VehicleList extends React.Component {
  constructor(props) {
    super(props);
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    this.state = {
      vehiclesList: [],
      hover: false,
      mapCoords: {}
    };
    fetch('/api/vehicleslist')
      .then(res => res.json())
      .then(result => {

        this.setState({ vehiclesList: result });
      })
      .catch(err => {
        console.error(err);
      });
  }

  onMouseEnterHandler(event) {
    this.setState({ hover: true });
    this.state.vehiclesList.map(vehicle => {
      if (String(vehicle.vehicleId) === event.currentTarget.id) {
        return this.setState({ mapCoords: { lat: Number(vehicle.currentLocation.lat), lng: Number(vehicle.currentLocation.lng) } });
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
          {this.state.vehiclesList.map(vehicle =>
            <div onMouseEnter={this.onMouseEnterHandler}
              onMouseLeave={this.onMouseLeaveHandler}
              key={vehicle.vehicleId} id={vehicle.vehicleId} className="box-two-thirds font-regular blue-text list-margin list-padding"
            >

              <a href={'#vehicleprofile?vehicleId=' + vehicle.vehicleId} className="nav-a">
              <table>
                <tbody>
                  <tr>
                    <td className=" blue-text">Name:</td>
                    <td className=" blue-text">{vehicle.name} </td>
                  </tr>
                  <tr>
                    <td className=" blue-text">Make: </td>
                    <td className=" blue-text">{vehicle.make}</td>
                    <td className=" blue-text"> Model:</td>
                    <td className=" blue-text">{vehicle.model}</td>
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
