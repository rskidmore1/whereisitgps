import React from 'react';
import VehicleInfoEdit from './components/vehicle-info-edit';
import PhotoUpload from './components/photo-upload';
import DriverInfoEdit from './components/driver-info-edit';
import AlertButtonBox from './components/alert-button-box';
export default class VehicleProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: {},
      vehicleId: this.props.vehicleId,
      driver: {}

    };

    fetch(`/api/vehicleinfo/${this.state.vehicleId}`)
      .then(res => res.json())
      .then(result => {

        this.setState({ vehicle: result });

      });

  }

  render() {

    const currentVehicle = Object.assign({}, this.state.vehicle);

    return (
      <React.Fragment>
      <div className="two-third  ">

        <VehicleInfoEdit currentVehicle={currentVehicle} />

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
