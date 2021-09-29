import React from 'react';

export default function VehicleInfo(props) {
  const { name, make, model, year, color, plate } = props.currentVehicle;
  return (
    <div className=" box-two-thirds blue-text ">
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
  );
}
