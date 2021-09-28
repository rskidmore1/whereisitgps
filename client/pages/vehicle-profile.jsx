import React from 'react';
import VehicleInfoEdit from './components/vehicle-info-edit';
import PhotoUpload from './components/photo-upload';
import DriverInfoEdit from './components/driver-info-edit';
import AlertButtonBox from './components/alert-button-box';
import DriverInfoMobile from './components/driver-info-mobile';
export default class VehicleProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: {},
      vehicleId: this.props.vehicleId,
      driver: {},
      isLoaded: false,
      networkError: ''

    };

    fetch(`/api/vehicleinfo/${this.state.vehicleId}`)
      .then(res => res.json())
      .then(result => {
        if (!result) {
          this.setState({ networkError: 'Results are empty.' });
        } else {
          this.setState({ vehicle: result, isLoaded: true });
        }

      })
      .catch(err => {
        this.setState({ isLoaded: true, networkError: 'Load failed. Please try again' });
        console.error(err);
      });

  }

  render() {

    const currentVehicle = Object.assign({}, this.state.vehicle);

    return (
      <React.Fragment>
      <div className="two-third  ">
        <div className={this.state.isLoaded ? 'summon-spinner lds-circle center hidden' : 'summon-spinner lds-circle center '}>
          <div ></div>
        </div>
        <p>{this.state.networkError}</p>

        <VehicleInfoEdit currentVehicle={currentVehicle} />
        <DriverInfoMobile />
        <AlertButtonBox vehicleId={currentVehicle.vehicleId} />
      </div>
      <div className="one-third ">
        <PhotoUpload vehicleId={currentVehicle.vehicleId} photo={currentVehicle.photo} />
        <DriverInfoEdit />
        </div>

      </React.Fragment>
    );
  }
}
