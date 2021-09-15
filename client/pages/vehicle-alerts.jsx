import React from 'react';

export default class VehicleAlerts extends React.Component {
  constructor(props) {
    super(props);
    const vId = 2;// Replace this when creating vehicle list feature
    this.state = { vehicle: {}, vehicleId: vId };
    this.handleSubmit = this.handleSubmit.bind(this);

    fetch(`/api/vehicleinfo/${vId}`)
      .then(res => res.json())
      .then(result => {

        this.setState({ vehicle: result });

      });

  }

  handleSubmit(event) {

    const vehicle = { name: event.target[0].value, make: event.target[2].value, model: event.target[4].value, year: event.target[1].value, color: event.target[3].value, plate: event.target[5].value };

    fetch('/api/vehicleinfo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },

      body: JSON.stringify(vehicle)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
    event.preventDefault();
  }

  render() {

    // const currentVehicle = Object.assign({}, this.state.vehicle);
    // const { name, make, model, year, color, plate } = currentVehicle;

    return (
      <div>
        <div className="alerts-box font-regular blue-text ">
          <form onSubmit={this.handleSubmit}>
            <div className="row vehicle-info-row box-padding">

              <div className="50-width alerts-col ">
                  <table>
                    <tbody>
                      <tr>
                      <td><input className="check-box" type="checkbox"></input></td>
                      <td><label>Speed </label><input type="text"></input><label> mph</label></td>
                      </tr>
                      <tr>
                      <td><input className="check-box" type="checkbox"></input></td>
                      <td><label>Hard Braking</label></td>
                      </tr>
                      <tr>
                      <td><input className="check-box" type="checkbox"></input></td>
                      <td><label>Hard Acceleration</label></td>
                      </tr>
                      <tr></tr>
                    <tr></tr>
                    </tbody>
                  </table>
                </div>

              <div className="50-width alerts-col">
                  <table>
                    <tbody>
                    <tr>
                      <td><input className="check-box" type="checkbox"></input></td>
                      <td><label>Text</label></td>
                    </tr>
                    <tr>
                      <td><input className="check-box" type="checkbox"></input></td>
                      <td><label>Email</label></td>
                    </tr>

                    </tbody>
                  </table>
                </div>
            </div>
            <div className='align-right'>
              <button className="save-button rounded-button font-regular blue-text" type="submit" value="Submit">Save</button>
            </div>

         </form>
        </div >

      </div>
    );
  }
}
