import db from "../models/index";

const registerTrip = async (tripData) => {
  try {
    // Create a new trip
    const newTrip = await db.Trip.create(tripData);

    return {
      EM: 'Trip registered successfully',
      EC: 0,
      DT: newTrip,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Error during trip registration',
      EC: 1,
      DT: null,
    };
  }
};

const getUserTrips = async (userId) => {
  try {
    // Fetch user's trips including associated location details
    const trips = await db.Trip.findAll({
      where: { userId },
      include: [
        { model: db.Location }
      ],
    });

    return {
      EM: 'Trips fetched successfully',
      EC: 0,
      DT: trips,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Error fetching user trips',
      EC: 1,
      DT: null,
    };
  }
};

export default {
  registerTrip,
  getUserTrips,
};