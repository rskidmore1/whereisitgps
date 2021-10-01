import React from 'react';

export default class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.showUpload = this.showUpload.bind(this);
    this.state = {
      uploadPhoto: false,
      photoUrl: this.props.photo
    };
  }

  showUpload() {
    if (this.state.uploadPhoto) {
      this.setState({ uploadPhoto: false });
    } else if (!this.state.uploadPhoto) {
      this.setState({ uploadPhoto: true });
    }
  }

  handlePhoto(event) {
    const formData = new FormData(event.target);
    this.setState({ uploadPhoto: false });
    fetch(`/api/vehiclephoto/${this.props.vehicleId}`, {
      method: 'PUT',
      body: formData
    })
      .then(response => response.json())
      .then(result => {

        event.target.reset();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    return (

         <div className="center " onClick={this.showUpload}>
            <div className="vehicle-photo-div center">
              <div className=" photo-margin-div">

            <form className={this.state.uploadPhoto ? 'photo-form' : 'hidden photo-form'} onSubmit={this.handlePhoto}>

              <div className="column-full photo-button-div">
                <label className="photo-label save-button rounded-button  blue-text center"><input type="file" name="image" />Upload</label>

                <button className="save-button rounded-button  blue-text center "
                  type="submit" >Save</button>
              </div>
            </form>

            <img className="vehicle-photo" src={this.props.photo} alt="" />
          </div>
        </div>
        </div>

    );
  }
}
