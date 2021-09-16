import React from 'react';

export default class VehicleProfile extends React.Component {
  constructor(props) {
    super(props);
    const vId = 2;// Replace this when creating vehicle list feature
    this.state = { vehicle: {}, vehicleId: vId };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);

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

  handlePhoto(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // console.log(formData);

    fetch('/api/uploads', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        // console.log('Success:', result);
        event.target.reset();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {

    const currentVehicle = Object.assign({}, this.state.vehicle);
    const { name, make, model, year, color, plate } = currentVehicle;

    return (
      <div>
        <div className=" box-two-thirds font-regular blue-text ">
          <div className="row vehicle-info-row box-padding">

            <div className="width-50 vehicle-info-col ">
                <table>
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <td>Year:</td>
                      <td>{year}</td>
                    </tr>
                    <tr>
                      <td>Make:</td>
                      <td>{make}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            <div className="width-50 vehicle-info-col ">
                <table>
                  <tbody>
                    <tr>
                      <td>Color:</td>
                      <td>{color}</td>
                    </tr>
                    <tr>
                      <td>Model:</td>
                      <td>{model}</td>
                    </tr>
                    <tr>
                      <td>Plate:</td>
                      <td>{plate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

          </div>
        </div >
        <br></br>

        <div className="box-two-thirds vehicle-info-edit font-regular blue-text">
          <form onSubmit={this.handleSubmit}>

            <div className="row vehicle-info-row box-padding" >
              <div className="width-50 vehicle-info-col">
                  <table>
                    <tbody>
                      <tr>
                        <td><label>Name:</label></td>
                        <td><input type="text" defaultValue={name} /></td>
                      </tr>
                      <tr>
                        <td><label>Year:</label></td>
                        <td><input type="number" defaultValue={year} /></td>
                      </tr>
                      <tr>
                        <td><label>Make:</label></td>
                        <td><input type="text" defaultValue={make} /></td>
                      </tr>
                    </tbody>
                  </table>

              </div>

              <div className="width-50 vehicle-info-col">
                <table>
                  <tbody>
                    <tr>
                      <td><label>Color:</label> </td>
                      <td> <input type="text" defaultValue={color} /></td>
                    </tr>
                    <tr>
                      <td><label>Model:</label> </td>
                      <td><input type="text" defaultValue={model} /> </td>
                    </tr>
                    <tr>
                      <td><label>Plate:</label> </td>
                      <td><input type="number" defaultValue={plate} /> </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

          <div className='align-right'>
              <button className="save-button rounded-button font-regular blue-text" type="submit" value="Submit">Save</button>
          </div>

          </form>
        </div>
        <div>
          <div className="vehicle-photo-div">
            <div className=" photo-margin-div">

              {/* <div className="column-full photo-button-div " >
                <button className="save-button rounded-button font-regular blue-text center "
                type="submit" value="Submit">Upload</button>

              </div> */}
              <div className="column-full photo-button-div">
                <form onSubmit={this.handlePhoto}>
                  <input required type="file" name="image" />
                  <button className="save-button rounded-button font-regular blue-text center "
                    type="submit" value="Submit">Upload</button>
                  </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}
