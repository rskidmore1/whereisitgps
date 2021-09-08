import React from 'react';

export default class VehicleProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { vehicle: [] };
    const vId = 2;

    fetch(`/api/vehicleinfo/${vId}`)
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        this.setState({ vehicle: result });
        // this.setState({ vehicle: [result] });
        // console.log(this.state.vehicle[0].name);
      });

  }

  render() {

    const currentVehicle = Object.assign({}, this.state.vehicle);
    const { name, make, model, year } = currentVehicle;

    return (

      <div>
      <div>
        <p>name {name}</p>
        <p>make{make}</p>
        <p>model{model}</p>
      </div>
      <div>
        <p>year{year}</p>
        <p>color</p>
        <p>plate</p>
      </div>
      </div >

    );
  }
}
