import express from "express";
import userController from '../controller/userController';
import locationController from '../controller/locationController';
import reviewController from '../controller/reviewController';
import tripController from '../controller/tripController';

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello world")
    })

    router.post('/register', userController.handleRegister);
    router.post('/login', userController.handleLogin);

    router.post('/create-location', locationController.handleAddLocation);
    router.get('/get-locations', locationController.handleGetLocations);
    router.get('/get-location-by-id/:id', locationController.handleGetLocationById);
    router.put('/update-location', locationController.handleUpdateLocation);
    router.get('/locations-random', locationController.handleGetRandomLocations);
    router.get('/get-location-and-reviews/:id', locationController.handleGetLocationAndReviewsById);

    // Route for Review
    router.post('/add-review', reviewController.handleAddReview);

    router.post('/book-trip', tripController.handleRegisterTrip);
    router.get('/get-trips-of-user/:userId', tripController.handleGetUserTrips);

    return app.use("/", router);
}

export default initWebRoutes;