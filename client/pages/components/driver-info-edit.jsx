import React from 'react';

function handleSubmit(event) {
  const driver = { name: event.target[0].value, phone: event.target[1].value, email: event.target[2].value };
  fetch('/api/driverinfo/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'

    },

    body: JSON.stringify(driver)
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
  event.preventDefault();
}

export default function DriverInfoEdit() {

  return (

    <div className=" blue-box font-regular blue-text ">

      <div className=" driver-info-edit font-regular blue-text">
        <form onSubmit={handleSubmit}>

          <div className="row driver-info-row box-padding" >
            <div className="width-50 vehicle-info-col">
              <table>
                <tbody>
                  <tr>
                    <td><label>Name:</label></td>
                    <td><input type="text" /></td>
                  </tr>
                  <tr>
                    <td><label>Phone:</label></td>
                    <td><input type="text" /></td>
                  </tr>
                  <tr>
                    <td><label>Email:</label></td>
                    <td><input type="text" /></td>
                  </tr>
                </tbody>
              </table>

            </div>

          </div>

          <div className='align-right'>
            <button className="save-button rounded-button font-regular blue-text"
            type="submit" value="Submit">Save</button>
          </div>

        </form>
      </div>
    </div>

  );
}
