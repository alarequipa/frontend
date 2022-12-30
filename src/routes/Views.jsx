import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../containers/Home";
import PrivateRoutes from "../routing/PrivateRoutes";
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import Register from "../components/Register";
import Login from "../components/Login";
import useValidations from "../hooks/useValidations";
import useInitialState from "../hooks/useInitialState";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthContext";
import AppContext from "../context/AppContext";
import ValidationContext from "../context/ValidationContext";
import ValidateInfo from "../components/ValidateInfo";
import Dashboard from "../pages/Dashboard";
import Business from "../pages/Business";
import BusinessInfo from "../pages/BusinessInfo";
import TicInfo from "../pages/TicInfo";
import LoginVisc from "../components/LoginVisc";
import Polices from "../pages/Polices";
const Views = () => {
  const {user}= useContext(AccountContext);
  const initialState= useInitialState();
  const validationState= useValidations();
  const authState=useAuth();
    return user.loggedIn===null?(
     <p>
        Loading...
     </p> 
      ):(
    <AuthContext.Provider value={authState}>
    <AppContext.Provider value={initialState}>
    <ValidationContext.Provider value={validationState}>
    <Routes>
      <Route element={<PrivateRoutes/>}>
      <Route exact path="/home/" element= {<Home/>}>
          <Route exact path="dashboard" element= {<Dashboard/>}/>
          <Route exact path="business" element= {<Business/>}/>
          <Route exact path="business/:id"	element={<BusinessInfo/>}/>
          <Route exact path="tic/:id"	element={<TicInfo/>}/>
          <Route exact path="/home/" element= {<Navigate to="dashboard"/>}/>
          <Route exact path="polices"	element={<Polices/>}/>
      </Route>
      </Route>
     
      <Route exact path="/login" element= {
      <Login/>
      } />
      <Route exact path="/loginVisc" element= {
      <LoginVisc/>
      } />
      <Route exact path="/register" element= {
      <Register/>
      } />
      <Route exact path="/validate" element= {
      <ValidateInfo/>
      } />
      <Route exact path="/" element= {
        <Register/>
         } />

    </Routes>
    </ValidationContext.Provider>
    </AppContext.Provider>
    </AuthContext.Provider>

    )

};

export default Views;