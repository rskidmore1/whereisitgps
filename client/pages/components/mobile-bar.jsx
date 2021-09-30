import React from 'react';

export default class MobileBar extends React.Component {
  constructor(props) {
    super(props);

    const url = window.location.href;
    let vehicleId = 0;
    let isVehicleProfile = false;
    if (url.includes('vehicleprofile')) {
      vehicleId = url.split('=')[1];
      isVehicleProfile = true;
    }

    this.state = {
      vehicleName: '',
      networkError: '',
      isVehicleProfile: isVehicleProfile
    };

    fetch(`/api/vehicleinfo/${vehicleId}`)
      .then(res => res.json())
      .then(result => {
        if (!result) {
          this.setState({ networkError: 'Results are empty.' });
        } else {
          this.setState({ vehicleName: result.name });
        }

      })
      .catch(err => {
        this.setState({ networkError: 'Load failed. Please try again' });
        console.error(err);
      });

  }

  render() {
    let title = this.props.title;
    if (this.state.isVehicleProfile) {
      title = this.state.vehicleName;
    }

    return (

      <div className="mobile-bar blue-text blue-box title-rounded center">
        <h2 className="mobile-title ">{title}</h2>
      </div>

    );
  }
}
