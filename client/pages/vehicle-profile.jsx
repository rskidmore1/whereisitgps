import React from 'react';
// import VehicleInfo from './components/vehicle-info';
import VehicleInfoEdit from './components/vehicle-info-edit';
import PhotoUpload from './components/photo-upload';
import DriverInfoEdit from './components/driver-info-edit';
import AlertButtonBox from './components/alert-button-box';

export default class VehicleProfile extends React.Component {
  constructor(props) {
    super(props);
    const vId = 2;// Replace this when creating vehicle list feature
    this.state = { vehicle: {}, vehicleId: vId, driver: {} };

    fetch(`/api/vehicleinfo/${this.props.vehicleId}`)
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
       {/* -make vehicle edit toggle here  */}
        <VehicleInfoEdit currentVehicle={currentVehicle} />
        <AlertButtonBox />
      </div>
      <div className="one-third ">
        <div className="center">
          <PhotoUpload />
          <DriverInfoEdit />
        </div>
      </div>
      </React.Fragment>
    );
  }
}
