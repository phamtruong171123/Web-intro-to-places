import axios from "axios"


const registerNewUser = (username, password, email, phone, address) => {
    return axios.post("http://localhost:8081/register", {
        email, phone, username, password, address
    })
}

const loginUser = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8081/login', {
        username,
        password,
      });
  
      return response;
    } catch (error) {
      throw error;
    }
  };


const fetchAllUsers = () => {
    return axios.get(`http://localhost:8081get-all-user`);
}


export {registerNewUser, loginUser, fetchAllUsers};