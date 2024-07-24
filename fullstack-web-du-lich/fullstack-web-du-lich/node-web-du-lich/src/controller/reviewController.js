// reviewController.js
import reviewService from '../service/reviewService';

const handleAddReview = async (req, res) => {
  try {
    const { rating, comment, locationId, username, userId } = req.body;
    console.log("check review: ", req.body)

    // Perform any validation checks here if needed

    // Call reviewService to handle adding a review
    const addReviewResult = await reviewService.addReview({
      rating,
      comment,
      locationId,
      username,
      userId,
    });

    // Return the result as JSON response
    return res.status(addReviewResult.EC === 0 ? 200 : 400).json({
      EM: addReviewResult.EM,
      EC: addReviewResult.EC,
      DT: addReviewResult.DT,
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
  handleAddReview,
};
