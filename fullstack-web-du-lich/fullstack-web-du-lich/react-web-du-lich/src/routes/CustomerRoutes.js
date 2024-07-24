import AppRoutes from "./AppRoutes";
import Login from "../pages/Login/Login";
import RegisterPage from "../pages/Register/RegisterPage";
import LocationDetail from '../pages/Home/LocationDetail/LocationDetail ';
import TripOfCustomer from "../pages/Home/ListTripOfCustomer/TripsOfCustomer";
import Home from "../pages/Home/Home";

const CustomerRoutes = () => {
    return (
        <>
            <AppRoutes path="/login" component={Login} permission="guest" />
            <AppRoutes path="/register" component={RegisterPage} permission="guest" />
            <AppRoutes path="/" exact component={Home} permission="guest" />
            <AppRoutes path="/location/:id" component={LocationDetail} permission="guest"/>
            <AppRoutes path="/trips-of-customer" component={TripOfCustomer} permission="guest"/>
        </>
    );
}

export default CustomerRoutes;