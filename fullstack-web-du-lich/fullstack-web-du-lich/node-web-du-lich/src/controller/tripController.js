// tripController.js
import tripService from '../service/tripService';

const handleRegisterTrip = async (req, res) => {
  try {
    const { startDate, endDate, name, email, phone, numberOfPeople, locationId, userId } = req.body;
    console.log("check trip: ", req.body)

    // Perform any validation checks here if needed

    // Call tripService to handle registering a trip
    const registerTripResult = await tripService.registerTrip({
      startDate,
      endDate,
      status: 'Đang xử lý',
      name,
      email,
      phone,
      numberOfPeople,
      locationId,
      userId,
      price: 0
    });

    // Return the result as JSON response
    return res.status(registerTripResult.EC === 0 ? 200 : 400).json({
      EM: registerTripResult.EM,
      EC: registerTripResult.EC,
      DT: registerTripResult.DT,
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

const handleGetUserTrips = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a URL parameter

    // Call tripService to get user's trips
    const userTripsResult = await tripService.getUserTrips(userId);

    // Return the result as JSON response
    return res.status(userTripsResult.EC === 0 ? 200 : 400).json({
      EM: userTripsResult.EM,
      EC: userTripsResult.EC,
      DT: userTripsResult.DT,
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
  handleRegisterTrip,
  handleGetUserTrips,
};