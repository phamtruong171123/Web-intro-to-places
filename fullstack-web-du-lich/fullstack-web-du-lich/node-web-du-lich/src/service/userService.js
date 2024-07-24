import db from "../models/index";

const registerUser = async (userData) => {
  try {
    // Check if the username or email is already taken
    console.log("check username: ", userData.username)
    const existingUser = await db.User.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { username: userData.username },
          { email: userData.email },
        ],
      },
    });

    if (existingUser) {
      return {
        EM: 'Username or email is already taken',
        EC: 1,
        DT: null,
      };
    }

    // Create a new user
    const newUser = await db.User.create(userData);

    return {
      EM: 'User registered successfully',
      EC: 0,
      DT: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Error during user registration',
      EC: 1,
      DT: null,
    };
  }
};

const loginUser = async ({ username, password }) => {
  try {
    // Check if the user exists
    const existingUser = await db.User.findOne({
      where: {
        username,
      },
    });

    if (!existingUser) {
      return {
        EM: 'Invalid username or password',
        EC: 1,
        DT: null,
      };
    }

    // Check if the password is correct
    if (existingUser.password !== password) {
      return {
        EM: 'Invalid username or password',
        EC: 1,
        DT: null,
      };
    }

    // Return success if the username and password are valid
    return {
      EM: 'Login successful',
      EC: 0,
      DT: existingUser,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Error during user login',
      EC: 1,
      DT: null,
    };
  }
};


module.exports = {
  registerUser, loginUser
};
