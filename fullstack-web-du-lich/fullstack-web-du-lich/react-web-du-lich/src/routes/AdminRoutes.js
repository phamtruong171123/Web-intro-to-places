import AppRoutes from "./AppRoutes";
import AdminHome from "../pages/Admin/AdminHome/AdminHome";
import ManageLocation from "../pages/Admin/ManageLocation/ManageLocation";
import ManageUser from "../pages/Admin/ManageUser/ManageUser";
import ManageTrip from "../pages/Admin/ManageTrip/ManageTrip";
import CreateLocation from "../pages/Admin/ManageLocation/CreateLocation";
import UpdateLocation from "../pages/Admin/ManageLocation/UpdateLocation";
import { Redirect } from "react-router-dom";

const AdminRoutes = () => {

    // const {user} = useContext(UserContext);
    let local = localStorage.getItem('user');
    let user = {}
    if(local) {
        user = JSON.parse(local);
    }
    const isAdmin = user.permission === 'admin';

    return (
        <>
            {isAdmin ?
                (
                    <>
                        <AppRoutes path="/admin" component={AdminHome} permission="admin" />
                        <AppRoutes path="/manage-user" component={ManageUser} permission="admin" />
                        <AppRoutes path="/manage-location" component={ManageLocation} permission="admin" />
                        <AppRoutes path="/create-location" component={CreateLocation} permission="admin" />
                        <AppRoutes path="/get-page-update-location/:id" component={UpdateLocation} permission="admin" />
                        <AppRoutes path="/manage-trip" component={ManageTrip} permission="admin" />
                    </>
                ) 
                : 
                (
                    <Redirect to="/login" />
                )
            }
        </>
    );
}

export default AdminRoutes;