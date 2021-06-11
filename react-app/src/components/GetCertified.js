import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateUser } from '../store/session';
import './styles/getcertified.css'

function GetCertified() {

    const userId = useSelector(state => state.session.user.id)
    const dispatch = useDispatch();
    const history = useHistory();
    const feesherClick = (e) => {
        e.preventDefault()
        dispatch(updateUser(userId))
        history.push('/')
    }

    return (
        <>
            <div className='nav-empty-div'></div>
            <div id='get-certified-container'>
                <h1>Become a Certified Feesher!</h1>
                <p>Do you love fish? Do you care about fish? Do you want to make some extra money taking care of fish? If these things are true you just need to become "Feesh certfied" and you can see needy people all around you that want help taking care of their fish. Watch the following video and you can become a "Feesher" and can become a bigger part of the Feesh community.</p>
                <div id='feed-video'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/ti2En_UfnoE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <br />
                <div id='feesher-button-div'>

                    <button onClick={feesherClick}>Become a Feesher</button>
                </div>
            </div>
        </>
    )
}

export default GetCertified;