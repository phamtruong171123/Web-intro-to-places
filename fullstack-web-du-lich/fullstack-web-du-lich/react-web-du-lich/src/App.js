import './App.scss';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoutes from './routes/AdminRoutes';
import CustomerRoutes from './routes/CustomerRoutes';


function App() {
 
  return (
    <>
      <Router>
        <Switch>
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/manage-location" component={AdminRoutes} />
          <Route path="/create-location" component={AdminRoutes} />
          <Route path="/get-page-update-location/:id" component={AdminRoutes} />
          <Route path="/manage-user" component={AdminRoutes} />
          <Route path="/manage-trip" component={AdminRoutes} />
          <Route component={CustomerRoutes} />
        </Switch>
      </Router>

      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
