import React from 'react';

export default class VehicleAlerts extends React.Component {
  constructor(props) {
    super(props);
    const vId = 2;
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

    }

    this.updateAlerts(alerts);

    event.preventDefault();
  }

  render() {

    const { speedingThreshold } = this.state.vehicle;
    return (
      <div className="two-third">
        <div className="center">
          <div className="alert-button-div-mobile  center">

            <form onSubmit={this.handleSubmit}>
              <div className="row " >

                <div className=" speed-div ">
                    <input className='speed-input' type="text" defaultValue={speedingThreshold} placeholder="MPH"></input>
                  </div>

                <div className=' update-div'>
                    <button className="save-button rounded-button  blue-text" type="submit" value="Submit">Update</button>
                  </div>

                </div>
              </form>
            </div>

          <div className="alert-button-div  blue-box alerts-box list-margin ">

            <form onSubmit={this.handleSubmit}>
              <div className="" >

                <div className=" speed-div ">
                  <input className='speed-input' type="text" defaultValue={speedingThreshold} placeholder="MPH"></input>
                </div>

                <div className=' update-div'>
                  <button className="save-button rounded-button blue-text list-margin " type="submit" value="Submit">Update</button>
                </div>

              </div>
            </form>
          </div>
        </div>

      </div>
    );
  }
}
