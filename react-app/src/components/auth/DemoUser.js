import React from 'react';
import { login } from "../../store/session";
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

export default function DemoUser() {
    // const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    // const history = useHistory()

    const onLogin = async (e) => {
        e.preventDefault();
        await dispatch(login("demo@aa.io", "password"));
    }

    return (
        <form id='demo-form-btn' onSubmit={onLogin}>
            <button id="auth-nav-btn" type="submit" className='nav-btn'>Demo Login</button>
        </form>
    );
}
