import React from 'react';

export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: {}, userId: 1 };
    this.handleSubmit = this.handleSubmit.bind(this);

    fetch(`/api/user/${this.state.userId}`)
      .then(res => res.json())
      .then(result => {
        this.setState({ user: result });
      });

  }

  handleSubmit(event) {
    const record = { username: event.target[0].value, firstname: event.target[1].value, lastname: event.target[2].value, phone: event.target[3].value, email: event.target[4].value, userId: this.state.userId };
    fetch(`/api/user/${this.state.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'

      },

      body: JSON.stringify(record)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
    event.preventDefault();

  }

  render() {
    const { username, firstname, lastname, phone, email } = this.state.user;
    return (
       <React.Fragment>
          <div className="two-third  ">
          <div className=" blue-box font-regular box-padding blue-text rounted-box margin-top-1rem">

          <div className=" font-regular blue-text ">
            <form onSubmit={this.handleSubmit}>

              <div className="row driver-info-row " >
                <div className="width-50 vehicle-info-col">
                  <table>
                    <tbody>
                      <tr>
                        <td><label>Username:</label></td>
                        <td><input type="text" value={username}/></td>
                      </tr>
                      <tr>
                        <td><label>First Name:</label></td>
                        <td><input type="text" value={firstname}/></td>
                      </tr>
                      <tr>
                        <td><label>Last Name:</label></td>
                        <td><input type="text" value={lastname}/></td>
                      </tr>
                      <tr>
                        <td><label>Phone:</label></td>
                        <td><input type="text" defaultValue={phone}/></td>
                      </tr>
                      <tr>
                        <td><label>Email:</label></td>
                        <td><input type="text" value={email}/></td>
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

            </div>
             <div className="one-third ">

             </div>
  </React.Fragment>

    );
  }
}
