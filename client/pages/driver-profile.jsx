import React from 'react';

export default class DriverProfile extends React.Component {
  constructor(props) {
    super(props);
    const dId = 2;// Replace this when creating vehicle list feature
    this.state = { driver: {}, driverId: dId };
    this.handleSubmit = this.handleSubmit.bind(this);

    fetch(`/api/driverinfo/${dId}`)
      .then(res => res.json())
      .then(result => {

        this.setState({ driver: result });

      });

  }

  handleSubmit(event) {

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

  render() {

    const { name, phone, email } = this.state.driver;

    return (
      <div>
        <div className=" box-two-thirds font-regular blue-text ">

        <div className="box-two-thirds driver-info-edit font-regular blue-text">
          <form onSubmit={this.handleSubmit}>

            <div className="row driver-info-row box-padding" >
              <div className="width-50 vehicle-info-col">
                  <table>
                    <tbody>
                      <tr>
                        <td><label>Name:</label></td>
                        <td><input type="text" defaultValue={name} /></td>
                      </tr>
                      <tr>
                        <td><label>Phone:</label></td>
                        <td><input type="text" defaultValue={phone} /></td>
                      </tr>
                      <tr>
                        <td><label>Email:</label></td>
                        <td><input type="text" defaultValue={email} /></td>
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
        </div>
        <br></br>
        <div className=" box-two-thirds font-regular blue-text ">

          <div className="box-two-thirds driver-info-edit font-regular blue-text">

              <div className="row driver-info-row box-padding" >
                <div className="width-50 vehicle-info-col">
                  <table>
                    <tbody className="driver-p">
                      <tr>
                        <td ><p className="driver-p">Name:</p></td>
                        <td><p className="driver-p">{name}</p></td>
                      </tr>
                      <tr>
                        <td><p className="driver-p">Phone:</p></td>
                        <td><p className="driver-p">{phone}</p></td>
                      </tr>
                      <tr>
                        <td><p className="driver-p">Email:</p></td>
                        <td><p className="driver-p">{email}</p></td>
                      </tr>
                    </tbody>
                  </table>

                </div>

              </div>

          </div>
        </div>
      </div>
    );
  }
}
