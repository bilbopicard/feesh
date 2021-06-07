import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoUser from './auth/DemoUser';
import LogoutButton from './auth/LogoutButton';
import './styles/navbar.css';
import feeshLogo from '../images/feesh-logo-2.svg';
import { useSelector, useStore } from 'react-redux';

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  console.log(user)
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true}>
            <img src={feeshLogo} alt="" />
          </NavLink>
        </li>
        {!user && <li>
          <DemoUser />
        </li>}

        {!user && <li>
          <NavLink to="/login" exact={true} className="nav-link">
            Login
          </NavLink>
        </li>}

        {!user && <li>
          <NavLink to="/sign-up" exact={true} className="nav-link">
            Sign Up
          </NavLink>
        </li>}

        {user && <li>
          <NavLink to="/appointments" exact={true} className="nav-link">
            My Appointments
          </NavLink>
        </li>}

        {user?.feeder === true && <li>
          <NavLink to='/find' className="nav-link">
            Appointments Near Me
          </NavLink>
        </li>}

        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
