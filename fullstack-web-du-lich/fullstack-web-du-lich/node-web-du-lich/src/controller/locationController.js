// locationController.js
import locationService from '../service/locationService';

const handleAddLocation = async (req, res) => {
  try {
    const { name, description, map, image1, image2, image3 } = req.body;

    // Perform any validation checks here if needed

    // Call locationService to handle adding a location
    const addLocationResult = await locationService.addLocation({
      name,
      description,
      map,
      image1,
      image2,
      image3,
    });

    // Return the result as JSON response
    return res.status(addLocationResult.EC === 0 ? 200 : 400).json({
      EM: addLocationResult.EM,
      EC: addLocationResult.EC,
      DT: addLocationResult.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: 'Internal Server Error',
      EC: '-1',
      DT: null,
    });
  }
};

const handleGetLocations = async (req, res) => {
    try {
      const { page, pageSize } = req.query;
  
      // Call locationService to handle getting locations with pagination
      const getLocationsResult = await locationService.getLocations(page, pageSize);
  
      // Return the result as JSON response
      return res.status(getLocationsResult.EC === 0 ? 200 : 400).json({
        EM: getLocationsResult.EM,
        EC: getLocationsResult.EC,
        DT: getLocationsResult.DT,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: 'Internal Server Error',
        EC: '-1',
        DT: null,
      });
    }
  };

  const handleGetLocationById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("check id location: ", id)
  
      // Call locationService to handle getting a location by ID
      const getLocationResult = await locationService.getLocationById(id);
  
      // Return the result as JSON response
      return res.status(getLocationResult.EC === 0 ? 200 : 400).json({
        EM: getLocationResult.EM,
        EC: getLocationResult.EC,
        DT: getLocationResult.DT,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: 'Internal Server Error',
        EC: '-1',
        DT: null,
      });
    }
  };

  const handleUpdateLocation = async (req, res) => {
    try {
      const updatedLocation = req.body; // Đối tượng location chứa cả id
      const { id } = updatedLocation;
  
      // Gọi locationService để xử lý cập nhật địa điểm
      const updateLocationResult = await locationService.updateLocation(id, updatedLocation);
  
      // Trả kết quả dưới dạng JSON response
      return res.status(updateLocationResult.EC === 0 ? 200 : 400).json({
        EM: updateLocationResult.EM,
        EC: updateLocationResult.EC,
        DT: updateLocationResult.DT,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: 'Internal Server Error',
        EC: '-1',
        DT: null,
      });
    }
  };

  const handleGetRandomLocations = async (req, res) => {
    try {
      const { count } = req.query;
      
      // Call locationService to handle getting random locations with reviews
      const getRandomLocationsResult = await locationService.getRandomLocationsWithReviews(count);
      
      // Return the result as JSON response
      return res.status(getRandomLocationsResult.EC === 0 ? 200 : 400).json({
        EM: getRandomLocationsResult.EM,
        EC: getRandomLocationsResult.EC,
        DT: getRandomLocationsResult.DT,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: 'Internal Server Error',
        EC: '-1',
        DT: null,
      });
    }
  };

  const handleGetLocationAndReviewsById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("check id location: ", id);
  
      // Call locationService to handle getting location and its reviews by ID
      const getLocationAndReviewsResult = await locationService.getLocationAndReviewsById(id);
  
      // Return the result as JSON response
      return res.status(getLocationAndReviewsResult.EC === 0 ? 200 : 400).json({
        EM: getLocationAndReviewsResult.EM,
        EC: getLocationAndReviewsResult.EC,
        DT: getLocationAndReviewsResult.DT,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        EM: 'Internal Server Error',
        EC: '-1',
        DT: null,
      });
    }
  };
  
  
  
  export default {
    handleAddLocation,
    handleGetLocations,
    handleGetLocationById,
    handleUpdateLocation,
    handleGetRandomLocations,
    handleGetLocationAndReviewsById
  };
