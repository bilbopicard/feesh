import React from 'react';
import { login } from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function DemoUser() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory()

    let openDoor = false;
    if (user) {
        openDoor = true
        setTimeout(() => {
            history.push('/');
        }, 1000)
    }
    const onLogin = async (e) => {
        e.preventDefault();
        await dispatch(login("demo@aa.io", "password"));
    }

    return (
        <form onSubmit={onLogin}>
            <button id="auth-nav-btn" type="submit" className='nav-btn'>DemoUser</button>
        </form>
    );
}
