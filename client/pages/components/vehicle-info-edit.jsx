import React from 'react';

function handleSubmit(event) {

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

export default function VehicleInfo(props) {
  const { name, make, model, year, color, plate } = props.currentVehicle;

  return (
    <React.Fragment>

    <div className="box-two-thirds box-padding rounted-box vehicle-info-edit font-regular blue-text vehicle-info-desktop">
      <form onSubmit={handleSubmit}>

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
          <button className="save-button rounded-button font-regular blue-text" type="submit" value="Submit">Save</button>
        </div>

      </form>
    </div>
    <div>
      <div className="blue-box">
        <h2 className="blue-text">Details</h2>
      </div>
      <div className="row">
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
