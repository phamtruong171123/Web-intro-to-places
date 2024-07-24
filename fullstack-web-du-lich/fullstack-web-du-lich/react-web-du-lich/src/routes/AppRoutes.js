import { Route } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import NavHeader from '../components/Header/NavHeader';
import Footer from '../components/Footer/Footer';
import MenuAdmin from "../components/MenuAdmin/MenuAdmin";
import "./Layout.scss";

const AppRoutes = ({ component: Component, permission, ...rest }) => {
    const { user } = useContext(UserContext);
    const isAdmin = user.permission === 'admin';
    const isCustomer = user.permission === 'guest';

    
  
    return (
        <Route
            {...rest}
            exact
            render={(props) => (isCustomer && permission === 'guest') || (isAdmin && permission === 'guest') ? 
                (
                    <>
                        <div className="customer-layout">
                            <NavHeader />
                            <Component {...props} />
                            <Footer />
                        </div>
                    </>
                )
                : 
                (
                    <>
                        <div className="admin-layout">
                                <div className="menu">
                                    <MenuAdmin/>
                                </div>
                                <div className="component">
                                    <Component {...props} />
                                </div>
                                
                        </div>
                    </>
                )
            }
        />
    );
  };
  
  export default AppRoutes;