import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../styles/signupform.css'
import fishLogo from '../../images/feesh-logo.svg'
import fishLogo2 from '../../images/feesh-logo-2.svg'

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [zip_code, setZipCode] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password, zip_code));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateZipCode = (e) => {
    setZipCode(e.target.value)
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className='nav-empty-div'></div>
      <div id='signup-upper-div'>
        <div id='signup-inner-div'>
          <img id='login-logo' src={fishLogo} alt="feesh logo" />
          <h1>Feesh</h1>
          <img id='login-logo' src={fishLogo2} alt="feesh logo" />
        </div>
        <div id='signup-container'>
          <h2>Sign-up</h2>
          <form onSubmit={onSignUp}>
            <div>
              <label>User Name</label>
              <br />
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <label>Email</label>
              <br />
              <input
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <label>Zip Code</label>
              <br />
              <input
                type="text"
                name="zip_code"
                pattern="[0-9]{5}"
                onChange={updateZipCode}
                value={zip_code}
              ></input>
            </div>
            <div>
              <label>Password</label>
              <br />
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <label>Repeat Password</label>
              <br />
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
