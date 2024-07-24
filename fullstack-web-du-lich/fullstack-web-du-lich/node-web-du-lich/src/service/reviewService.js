// reviewService.js
import db from "../models/index";

const addReview = async (reviewData) => {
  try {
    // Create a new review
    const newReview = await db.Review.create(reviewData);

    return {
      EM: 'Review added successfully',
      EC: 0,
      DT: newReview,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Error during review addition',
      EC: 1,
      DT: null,
    };
  }
};

export default {
  addReview,
};
