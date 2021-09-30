import React from 'react';

export default class DriverInfoMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driverId: 1,
      drawerOpen: false,
      driver: {}
    };
    this.handleDrawer = this.handleDrawer.bind(this);

    fetch(`/api/driverinfo/${this.state.driverId}`)
      .then(response => response.json())
      .then(result => {
        this.setState({ driver: result });

      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  handleDrawer(event) {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    const { name, phone, email } = this.state.driver;

    return (
      <React.Fragment>

        <div className="driver-info-mobile ">
          <div onClick={this.handleDrawer} className="blue-box row">
            <div className="width-50">

              <h2 className="blue-text  vehicle-info-margin">Driver</h2>

            </div>
            <div className="width-50 ">
              <div className="float-right">

                <i className={this.state.drawerOpen ? 'fa fa-chevron-down vehicle-info-margin ' : 'fa fa-chevron-up vehicle-info-margin '}></i>
              </div>
            </div>
          </div>
          <div className={this.state.drawerOpen ? 'row' : 'row hidden'}>
            <div className="center">
              <table>
                <tbody>
                  <tr>
                    <td >Name:</td>
                  </tr>
                  <tr>
                    <td >Phone:</td>
                  </tr>
                  <tr>
                    <td >Email:</td>
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
                    <td >{phone}</td>
                  </tr>
                  <tr>
                    <td >{email}</td>
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
