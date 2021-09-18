import React from 'react';

export default class VehicleAlerts extends React.Component {
  constructor(props) {
    super(props);
    const vId = 2;// Replace this when creating vehicle list feature
    this.state = { vehicle: {}, vehicleId: vId, demoVehicle: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendText = this.sendText.bind(this);
    this.updateAlerts = this.updateAlerts.bind(this);

    fetch(`/api/vehicleinfo/${this.props.vehicleId}`)
      .then(res => res.json())
      .then(result => {
        this.setState({ vehicle: result });
      });

  }

  sendText(text) {
    fetch('/api/sendtext/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(text)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
  }

  updateAlerts(alerts) {
    fetch(`/api/vehiclealerts/${this.props.vehicleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(alerts)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleSubmit(event) {

    const alerts = { speedAlert: event.target[0].checked, speedingThreshold: event.target[1].value, brakeAlert: event.target[2].checked, accelerationAlert: event.target[3].checked, textAlert: event.target[4].checked, emailAlert: event.target[5].checked };
    this.setState({ vehicle: alerts });
    if (this.state.vehicle.demo) {
      if (alerts.textAlert) {
        if (this.state.vehicle.topSpeed > alerts.speedingThreshold) {
          const message = `${this.state.vehicle.name} has exceeded speeding threshold. Speed: ${alerts.topSpeed}`;
          const text = { toNumber: '+19492664664', message: message };
          this.sendText(text);
        }
      }
      if (alert.emailAlert) {
        // email alert code goes here. -make function
      }

    }

    this.updateAlerts(alerts);

    event.preventDefault();
  }

  render() {

    const { speedingThreshold, speedAlert, brakeAlert, accelerationAlert, textAlert, emailAlert } = this.state.vehicle;
    return (
      <div>
        <div className="alerts-box font-regular blue-text ">
          <form onSubmit={this.handleSubmit}>
            <div className="row vehicle-info-row box-padding">

              <div className="50-width alerts-col ">
                  <table>
                    <tbody>
                      <tr>
                      <td><input className="check-box" type="checkbox" defaultChecked={speedAlert}></input></td>
                      <td><label>Speed </label><input type="text" defaultValue={speedingThreshold}></input><label> mph</label></td>
                      </tr>
                      <tr>
                      <td><input className="check-box" type="checkbox" defaultChecked={brakeAlert} ></input></td>
                      <td><label>Hard Braking</label></td>
                      </tr>
                      <tr>
                      <td><input className="check-box" type="checkbox" defaultChecked={accelerationAlert}></input></td>
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
                      <td><input className="check-box" type="checkbox" defaultChecked={textAlert}></input></td>
                      <td><label>Text</label></td>
                    </tr>
                    <tr>
                      <td><input className="check-box" type="checkbox" defaultChecked={emailAlert}></input></td>
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
