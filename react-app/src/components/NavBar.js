import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoUser from './auth/DemoUser';
import LogoutButton from './auth/LogoutButton';
import './styles/navbar.css';
import feeshLogo from '../images/feesh-logo-2.svg';
import { useSelector } from 'react-redux';

const NavBar = () => {

  const user = useSelector(state => state.session.user)
  // console.log(user)
  return (
    <nav>
      <ul>
        {user && <li>
          <NavLink to="/" exact={true}>
            <img src={feeshLogo} alt="" />
          </NavLink>
        </li>}

        {/* {!user && <li>
          <DemoUser />
        </li>} */}

        {/* {!user && <li>
          <NavLink to="/login" exact={true} className="nav-link">
            Login
          </NavLink>
        </li>} */}

        {/* {!user && <li>
          <NavLink to="/sign-up" exact={true} className="nav-link">
            Sign Up
          </NavLink>
        </li>} */}

        {user && <li>
          <NavLink to="/about" exact={true} className="nav-link">
            About
          </NavLink>
        </li>}

        {user && <li>
          <NavLink to="/appointments" exact={true} className="nav-link">
            My Calendar
          </NavLink>
        </li>}

        {user && user?.feeder && <li>
          <NavLink to='/find' className="nav-link">
            Go Feeshing
          </NavLink>
        </li>}
        {user && !user?.feeder && <li>
          <NavLink to='/getcertified' className="nav-link">
            Become Feesh Certified
          </NavLink>
        </li>}

        {user && <li>
          <LogoutButton />
        </li>}
      </ul>
    </nav>
  );
}

export default NavBar;
