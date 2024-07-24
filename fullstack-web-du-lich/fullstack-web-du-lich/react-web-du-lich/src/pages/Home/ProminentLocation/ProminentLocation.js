import React, { useState, useEffect } from 'react';
import CardLocation from '../../../components/CardLocation/CardLocation';
import { getLocationsRandom } from '../../../services/locationService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProminentLocation.scss';

const ProminentLocation = () => {
  const [prominentLocations, setProminentLocations] = useState([]);

  useEffect(() => {
    // Gọi API để lấy ngẫu nhiên 4 địa điểm
    getLocationsRandom(4)
      .then((response) => {
        const data = response.data.DT;
        setProminentLocations(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // [] đảm bảo useEffect chỉ chạy sau khi component được mount

  return (
    <div className="prominent-location my-5">
      <h3>Nổi bật</h3>
      <div className="location-list">
        {prominentLocations.map((location) => (
          <CardLocation
            id={location.id}
            name={location.name}
            imageUrl={location.image1}
            description={location.description}
            rating={location.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ProminentLocation;
