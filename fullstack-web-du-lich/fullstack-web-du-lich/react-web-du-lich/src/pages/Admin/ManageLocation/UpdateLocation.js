import React, { useState, useEffect } from 'react';
import { getLocationById, updateLocation } from '../../../services/locationService';
import { useParams, useHistory } from 'react-router-dom';

const UpdateLocation = () => {
  const { id } = useParams();
  const history = useHistory();
  const [locationInfo, setLocationInfo] = useState({
    name: '',
    description: '',
    map: '',
    image1: '',
    image2: '',
    image3: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationInfo((prevLocationInfo) => ({
      ...prevLocationInfo,
      [name]: value,
    }));
  };

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLocationInfo((prevLocationInfo) => ({
          ...prevLocationInfo,
          [imageKey]: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await updateLocation(locationInfo);
        if (response.data.EC === 0) {
            history.push('/manage-location');
        } else {
          console.error('Error fetching location details:', response.data.EM);
        }
      } catch (error) {
        console.error('Error fetching location details:', error);
      }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLocationById(id);
        if (response.data.EC === 0) {
          const locationData = response.data.DT;
          setLocationInfo(locationData);
        } else {
          console.error('Error fetching location details:', response.data.EM);
        }
      } catch (error) {
        console.error('Error fetching location details:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={locationInfo.name}
                onChange={(e) => handleInputChange(e)}
                name="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={locationInfo.description}
                onChange={(e) => handleInputChange(e)}
                name="description"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="map" className="form-label">
                Map
              </label>
              <input
                type="text"
                className="form-control"
                id="map"
                value={locationInfo.map}
                onChange={(e) => handleInputChange(e)}
                name="map"
              />
            </div>

            {['image1', 'image2', 'image3'].map((imageKey) => (
              <div key={imageKey} className="mb-3">
                <label htmlFor={imageKey} className="form-label">
                  {imageKey.charAt(5).toUpperCase() + imageKey.slice(6)} {/* Format label */}
                </label>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id={imageKey}
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, imageKey)}
                  />
                  {locationInfo[imageKey] && (
                    <img
                      src={locationInfo[imageKey]}
                      alt={`${imageKey} preview`}
                      style={{ width: '70px', height: '70px' }}
                    />
                  )}
                </div>
              </div>
            ))}

            <button type="submit" className="btn btn-primary">
              Update Location
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateLocation;
