import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { displayAppointments } from "../store/appointments";
import Map from './Map';
import HomeBlurb from './HomeBlurb';
import './styles/homepage.css'
import './styles/myAppointments.css';

function MyAppointments() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user.username)
    const userId = useSelector(state => state.session.user.id)

    const myAppointments = useSelector(state => {
        return state.appointments.list.map(appointmentId => state.appointments[appointmentId]).filter(appointment => appointment.user_id === userId)
    })

    // console.log(myAppointments)

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    return (
        <>
            <div class='nav-empty-div'></div>
            <div id='my-appointment-outer-div'>
                <h2>{user}</h2>
                <h1 id='my-appointments-h1'>My Appointments</h1>
                {myAppointments.map(appointment => (
                    <div id='my-appointment-inner-div' className={appointment.completed ? 'completed' : ''} key={appointment.id}>
                        {appointment.appointment_type}
                        <br />
                        {appointment.description}
                    </div>
                ))}
            </div>
        </>
    );
}
export default MyAppointments;
