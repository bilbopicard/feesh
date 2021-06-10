import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoUser from '../auth/DemoUser';
import fishLogo from '../../images/feesh-logo.svg'
import fishLogo2 from '../../images/feesh-logo-2.svg'
import '../styles/loginform.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className='nav-empty-div'></div>
      <div id='login-container'>
        <div id='login-upper-div'>
          <div className='login-inner-div'>
            <img id='login-logo' src={fishLogo} alt="feesh logo" />
            <h1>Feesh</h1>
            <img id='login-logo' src={fishLogo2} alt="feesh logo" />
          </div>
        </div>

        <div id='login-lower-div'>
          <h2>Login</h2>
          <form onSubmit={onLogin}>
            <div>
              {errors.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
            <div className='login-input-div'>
              <label htmlFor="email">Email</label>
              <br />
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='login-input-div'>
              <label htmlFor="password">Password</label>
              <br />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button id='login-submit' type="submit">Login</button>
          </form>
          <DemoUser />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
