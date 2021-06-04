import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoUser from './auth/DemoUser';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <DemoUser />
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/appointments" exact={true} activeClassName="active">
            My Appointments
          </NavLink>
        </li>
        <li>
          <NavLink to='/find'>
            Appointments Near Me
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
