import React from 'react';

export default class VehicleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrawer = this.handleDrawer.bind(this);

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

  handleDrawer(event) {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    const { name, make, model, year, color, plate } = this.props.currentVehicle;

    return (
      <React.Fragment>

        <div className="box-two-thirds box-padding rounted-box vehicle-info-edit  blue-text vehicle-info-desktop">
          <form onSubmit={this.handleSubmit}>

            <div className="row vehicle-info-row box-padding" >
              <div className="width-50 vehicle-info-col">
                <table>
                  <tbody>
                    <tr>
                      <td><label>Name:</label></td>
                      <td><input className="vehicle-input" type="text" defaultValue={name} /></td>
                    </tr>
                    <tr>
                      <td><label>Year:</label></td>
                      <td><input className="vehicle-input" type="number" defaultValue={year} /></td>
                    </tr>
                    <tr>
                      <td><label>Make:</label></td>
                      <td><input className="vehicle-input" type="text" defaultValue={make} /></td>
                    </tr>
                  </tbody>
                </table>

              </div>

              <div className="width-50 vehicle-info-col">
                <table>
                  <tbody>
                    <tr>
                      <td><label>Color:</label> </td>
                      <td> <input className="vehicle-input" type="text" defaultValue={color} /></td>
                    </tr>
                    <tr>
                      <td><label>Model:</label> </td>
                      <td><input className="vehicle-input" type="text" defaultValue={model} /> </td>
                    </tr>
                    <tr>
                      <td><label>Plate:</label> </td>
                      <td><input className="vehicle-input" type="number" defaultValue={plate} /> </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            <div className='align-right'>
              <button className="save-button rounded-button blue-text" type="submit" value="Submit">Save</button>
            </div>

          </form>
        </div>
        <div className="vehicle-info-mobile">
          <div onClick={this.handleDrawer} className="blue-box row">
            <div className="width-50">

                <h2 className="blue-text  vehicle-info-margin">Details</h2>

            </div>
            <div className="width-50 ">
              <div className="float-right">

                <i className={this.state.drawerOpen ? 'fa fa-chevron-down vehicle-info-margin ' : 'fa fa-chevron-up vehicle-info-margin ' }></i>
              </div>
            </div>

          </div>
          <div className={this.state.drawerOpen ? 'row' : 'row hidden'}>
            <div className="center">
              <table>
                <tbody>
                  <tr>
                    <td >Name</td>
                  </tr>
                  <tr>
                    <td >Make</td>
                  </tr>
                  <tr>
                    <td >Model</td>
                  </tr>
                  <tr>
                    <td >Year</td>
                  </tr>
                  <tr>
                    <td >Color</td>
                  </tr>
                  <tr>
                    <td >Plate</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='center'>
              <table>
                <tbody>
                  <tr>
                    <td >{name}</td>
                  </tr>
                  <tr>
                    <td >{make}</td>
                  </tr>
                  <tr>
                    <td >{model}</td>
                  </tr>
                  <tr>
                    <td >{year}</td>
                  </tr>
                  <tr>
                    <td >{color}</td>
                  </tr>
                  <tr>
                    <td >{plate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}
