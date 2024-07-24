// controllers/userController.js
import userService from '../service/userService';

const handleRegister = async (req, res) => {
  try {
    const { username, password, email, phone, address } = req.body;

    // Perform any validation checks here if needed

    // Call userService to handle registration
    const registrationResult = await userService.registerUser({
      username,
      password,
      email,
      phone,
      address,
    });

    // Return the result as JSON response
    return res.status(registrationResult.EC === 0 ? 200 : 400).json({
      EM: registrationResult.EM,
      EC: registrationResult.EC,
      DT: registrationResult.DT,
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

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Perform any validation checks here if needed

    // Call userService to handle login
    const loginResult = await userService.loginUser({
      username,
      password,
    });

    // Return the result as JSON response
    return res.status(loginResult.EC === 0 ? 200 : 401).json({
      EM: loginResult.EM,
      EC: loginResult.EC,
      DT: loginResult.DT,
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

module.exports = {
  handleRegister, handleLogin
};
