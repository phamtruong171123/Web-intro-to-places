import axios from "axios";

const getTripsOfUser = (userId) => {
    return axios.get(`http://localhost:8081/get-trips-of-user/${userId}`);
}

export { getTripsOfUser };