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
      mapCoords: {},
      isLoaded: false,
      networkError: ''
    };
    fetch('/api/vehicleslist')
      .then(res => res.json())
      .then(result => {
        if (!result) {
          this.setState({ networkError: 'Results are empty.' });
        } else {
          this.setState({ vehiclesList: result, isLoaded: true });
        }
      })
      .catch(err => {
        this.setState({ isLoaded: true, networkError: 'Load failed. Please try again' });
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
          <div className={this.state.isLoaded ? 'summon-spinner lds-circle center hidden' : 'summon-spinner lds-circle center '}>
            <div ></div>
          </div>
          <p>{this.state.networkError}</p>
          {this.state.vehiclesList.map(vehicle =>
            <div onMouseEnter={this.onMouseEnterHandler}
              onMouseLeave={this.onMouseLeaveHandler}
              key={vehicle.vehicleId} id={vehicle.vehicleId} className="vehicle-list-item box-two-thirds blue-text list-margin list-padding rounted-box "
            >

              <a href={'#vehicleprofile?vehicleId=' + vehicle.vehicleId} className="nav-a row">

              <table>
                <tbody>
                  <tr >
                      <td className=" blue-text font-heavy list-bottom-padding list-item-right-padding">Vehicle Name</td>
                      <td className=" blue-text list-bottom-padding">{vehicle.name} </td>
                  </tr>
                  <tr >
                      <td className=" blue-text font-heavy list-bottom-padding list-item-right-padding">Make </td>
                      <td className=" blue-text list-bottom-padding">{vehicle.make}</td>
                   </tr>
                   <tr>
                      <td className=" blue-text font-heavy list-item-right-padding"> Model</td>
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
            <div className={this.state.hover ? 'map-outer-div' : '  map-outer-div hidden'}>
              <div className="list-map-margin">
                <MapList coords={this.state.mapCoords} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>

    );
  }
}
