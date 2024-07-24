// locationService.js
import db from "../models/index";

const addLocation = async (locationData) => {
  try {
    // Create a new location
    const newLocation = await db.Location.create(locationData);

    return {
      EM: 'Location added successfully',
      EC: 0,
      DT: newLocation,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Error during location addition',
      EC: 1,
      DT: null,
    };
  }
};

const getLocations = async (page, pageSize) => {
    try {
      // Sử dụng Sequelize để lấy danh sách địa điểm với phân trang
      const locations = await db.Location.findAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        raw: true, // Chỉ trả về dữ liệu JSON thô, không cần instance Sequelize
      });
  
      // Sử dụng hàm countLocations để lấy tổng số lượng địa điểm
      const total = await countLocations();
  
      return {
        EM: 'Success',
        EC: 0,
        DT: {
          locations,
          total,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        EM: 'Error during location retrieval',
        EC: 1,
        DT: null,
      };
    }
  };

  const countLocations = async () => {
    try {
      const count = await db.Location.count();
      return count;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const getLocationById = async (locationId) => {
    try {
      // Use Sequelize to find a location by ID
      const location = await db.Location.findByPk(locationId, {
        raw: true,
      });
  
      if (location) {
        return {
          EM: 'Success',
          EC: 0,
          DT: location,
        };
      } else {
        return {
          EM: 'Location not found',
          EC: 1,
          DT: null,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        EM: 'Error during location retrieval',
        EC: 1,
        DT: null,
      };
    }
  };

  const updateLocation = async (locationId, updatedData) => {
    try {
      // Kiểm tra xem địa điểm có tồn tại không
      const existingLocation = await db.Location.findByPk(locationId);
  
      if (!existingLocation) {
        return {
          EM: 'Location not found',
          EC: 1,
          DT: null,
        };
      }
  
      // Cập nhật thông tin địa điểm
      await existingLocation.update(updatedData);
  
      return {
        EM: 'Location updated successfully',
        EC: 0,
        DT: existingLocation,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: 'Error during location update',
        EC: 1,
        DT: null,
      };
    }
  };

  const getRandomLocationsWithReviews = async (count) => {
    try {
        const locations = await db.Location.findAll({
            order: db.sequelize.random(),
            limit: count,
            include: [{
              model: db.Review,
              attributes: ['rating', 'comment'],
            }],
            raw: true,
          });
  
      return {
        EM: 'Success',
        EC: 0,
        DT: locations,
      };
    } catch (error) {
      console.log(error);
      return {
        EM: 'Error during random location retrieval',
        EC: 1,
        DT: null,
      };
    }
  };

  const getLocationAndReviewsById = async (locationId) => {
    try {
      // Use Sequelize to find a location by ID along with its associated reviews
      const locationWithReviews = await db.Location.findOne({
        where: { id: locationId },
        include: [{
          model: db.Review,
          attributes: ['id', 'rating', 'comment', 'locationId', 'username', 'userId', 'createdAt'],
        }],
      });
  
      if (locationWithReviews) {
        // Extract necessary information from the location and reviews
        const locationDetails = {
          id: locationWithReviews.id,
          name: locationWithReviews.name,
          description: locationWithReviews.description,
          map: locationWithReviews.map,
          // Add image URLs
          image1: locationWithReviews.image1,
          image2: locationWithReviews.image2,
          image3: locationWithReviews.image3,
          // Add other location-related fields as needed
          reviews: locationWithReviews.Reviews.map((review) => ({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            username: review.username,
            userId: review.userId,
            createdAt: review.createdAt,
          })),
        };
  
        return {
          EM: 'Success',
          EC: 0,
          DT: locationDetails,
        };
      } else {
        return {
          EM: 'Location not found',
          EC: 1,
          DT: null,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        EM: 'Error during location and reviews retrieval',
        EC: 1,
        DT: null,
      };
    }
  };
  
  

export default {
  addLocation,
  getLocations,
  getLocationById,
  updateLocation,
  getRandomLocationsWithReviews,
  getLocationAndReviewsById,
};
