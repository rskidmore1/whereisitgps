import React from 'react';

function handlePhoto(event) {
  const vehicleId = 2;
  event.preventDefault();
  const formData = new FormData(event.target);

  fetch(`/api/vehiclephoto/${vehicleId}`, {
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

export default function PhotoUpload(props) {

  return (

      <div className="vehicle-photo-div">
        <div className=" photo-margin-div">
          <form onSubmit={handlePhoto}>

            <div className="column-full photo-button-div">
              <label className="photo-label save-button rounded-button font-regular blue-text center"><input required type="file" name="image" />Upload</label>

              <button className="save-button rounded-button font-regular blue-text center "
                type="submit" >Save</button>
            </div>
          </form>

        </div>

      </div>

  );
}
