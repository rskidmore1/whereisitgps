import React from 'react';

export default class DriverInfoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    fetch('/api/driverinfo/1')
      .then(response => response.json())
      .then(result => {

        this.setState({ driver: result });
      })
      .catch(error => {
        console.error('Error:', error);
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

     <div className=" driver-info-edit blue-box box-padding blue-text rounted-box driver-info-margin">

       <div className="  blue-text ">
         <form onSubmit={this.handleSubmit}>

           <div className="row driver-info-row " >
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
             <button className="save-button rounded-button  blue-text"
               type="submit" value="Submit">Save</button>
           </div>

         </form>
       </div>
     </div>

    );
  }

}
