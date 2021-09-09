import React from 'react';

export default class VehicleProfile extends React.Component {
  constructor(props) {
    super(props);
    const vId = 2;// Replace this when it time
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

    const currentVehicle = Object.assign({}, this.state.vehicle);
    const { name, make, model, year, color, plate } = currentVehicle;

    return (
      <div>
        <div className="row box-two-thirds">
          <div className="width-50 vehicle-info-div">
            <p>name {name}</p>
            <p>year {year}</p>
            <p>make {make}</p>
          </div>
          <div className="width-50 vehicle-info-div">
            <p>color {color}</p>
            <p>model {model}</p>
            <p>plate {plate}</p>
          </div>
        </div >
<br></br>

        <div className="box-two-thirds">
          <form onSubmit={this.handleSubmit}>

          <div className="row">
              <div className="width-50 vehicle-info-div">
                <label>
                  Name
                  <input type="text" defaultValue={name} />
                </label><br></br>
                <label>
                  Year
                  <input type="number" defaultValue={year} />
                </label><br></br>
                <label>
                  Make
                  <input type="text" defaultValue={make} />
                </label><br></br>
              </div>

              <div className="width-50 vehicle-info-div">
                <label>
                  Color
                  <input type="text" defaultValue={color} />
                </label><br></br>
                <label>
                  Model<input type="text" defaultValue={model} />
                </label><br></br>
                <label>
                  Plate
                  <input type="number" defaultValue={plate} />
                </label><br></br>
              </div>

            </div>
            <div className='align-right'>
              <button className="right" type="submit" value="Submit">Save</button>
            </div>
          </form>
        </div>

      </div>
    );
  }
}
