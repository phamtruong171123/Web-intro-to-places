import axios from "axios"

const createLocation = (location) => {
    return axios.post("http://localhost:8081/create-location", location)
}

const getLocation = (page, pageSize) => {
    return axios.get(`http://localhost:8081/get-locations?page=${page}&pageSize=${pageSize}`);
  }

const getLocationById = (locationId) => {
    return axios.get(`http://localhost:8081/get-location-by-id/${locationId}`);
}

const updateLocation = (locationUpdate) => {
    return axios.put(`http://localhost:8081/update-location`, locationUpdate);
}

const getLocationsRandom = (count) => {
    return axios.get(`http://localhost:8081/locations-random?count=${count}`);
  };
  const getLocationAndReviewByLocationId = (id) => {
    return axios.get(`http://localhost:8081/get-location-and-reviews/${id}`);
}

export {createLocation, getLocation, getLocationById, updateLocation, getLocationsRandom, getLocationAndReviewByLocationId };