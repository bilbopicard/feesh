import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { displayAppointments } from "../store/appointments";

function Homepage() {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    return (
        <div>
            <div id='appointment-type-container'>
                <div className='home-inner-type-div current'><NavLink to='/appointments/new/feeding'>Feeding</NavLink></div>
                <div className='home-inner-type-div'><NavLink to='/appointments/new/training'>Training</NavLink></div>
                <div className='home-inner-type-div'><NavLink to='/appointments/new/drop-in'>Drop-In</NavLink></div>
                <div className='home-inner-type-div'><NavLink to='/appointments/new/health'>Health</NavLink></div>
                <div className='home-inner-type-div'><NavLink to='/appointments/new/sitting'>Sitting</NavLink></div>
                <div className='home-inner-type-div'><NavLink to='/appointments/new/boarding'>Boarding</NavLink></div>
            </div>
        </div>
    );
}
export default Homepage;
