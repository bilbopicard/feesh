import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Homepage from './components/Homepage';
import Test from "./components/Test";
import { authenticate } from "./store/session";
import { displayAppointments } from "./store/appointments";
import NewAppointment from './components/NewAppointment';
import MyAppointments from './components/MyAppointments';

function App() {
  const user = useSelector(state => state.session.user)
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
        <ProtectedRoute path='/test'>
          <Test />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
