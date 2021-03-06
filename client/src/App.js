import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
  
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react/cjs/react.development';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser,setLoggedInUser]=useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
   <Router>
     <Header></Header>
       <Switch> 
         <Route path="/shop">
         <Shop></Shop>
         </Route>
         <Route path="/review">
         <Review></Review>
         </Route>
         <PrivateRoute path="/inventory">
         <Inventory></Inventory>
         </PrivateRoute>
         <Route exact path="/">
           <Shop></Shop>
         </Route>
         <Route path="/product/:productKey">
           <ProductDetails></ProductDetails>
         </Route>
         <PrivateRoute path="/shipment">
          <Shipment></Shipment>
         </PrivateRoute>
         <Route path ="/login">
           <Login></Login>
           </Route>
         <Route path ="*">
           <NotFound></NotFound>
         </Route>
         </Switch>
         </Router>
      </UserContext.Provider>
    
  
  );
}

export default App;
