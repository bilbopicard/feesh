import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
// import User from "./components/User";
import Homepage from './components/Homepage';
import { authenticate } from "./store/session";
// import { displayAppointments } from "./store/appointments";
import NewAppointment from './components/NewAppointment';
import MyAppointments from './components/MyAppointments';
import SingleAppointment from './components/SingleAppointment';
import FindAppointments from './components/FindAppointments';
import EditAppointment from './components/EditAppointment';
import About from './components/About';
import GetCertified from './components/GetCertified';

function App() {
  // const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);


  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/appointments" exact={true} >
          <MyAppointments />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} >
          <Homepage />
        </ProtectedRoute>
        <ProtectedRoute path="/appointments/new/:type" exact={true} >
          <NewAppointment />
        </ProtectedRoute>
        <ProtectedRoute path='/appointments/:appointmentId' exact={true} >
          <SingleAppointment />
        </ProtectedRoute>
        <ProtectedRoute path='/find' exact={true} >
          <FindAppointments />
        </ProtectedRoute>
        <ProtectedRoute path='/getcertified'>
          <GetCertified />
        </ProtectedRoute>
        <ProtectedRoute path='/appointments/:id/edit'>
          <EditAppointment />
        </ProtectedRoute>
        <Route path='/about'>
          <About />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
