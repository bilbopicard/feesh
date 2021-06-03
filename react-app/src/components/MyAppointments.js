import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { displayAppointments } from "../store/appointments";
import './styles/homepage.css'
import HomeBlurb from './HomeBlurb';
import './styles/myAppointments.css';

function MyAppointments() {

    const dispatch = useDispatch();

    const userId = useSelector(state => state.session.user.id)

    const myAppointments = useSelector(state => {
        return state.appointments.list.map(appointmentId => state.appointments[appointmentId]).filter(appointment => appointment.user_id === userId)
    })

    // console.log(myAppointments)

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    return (
        <div id='my-appointment-outer-div'>
            <h1 id='my-appointments-h1'>My Appointments</h1>
            {myAppointments.map(appointment => (
                <div id='my-appointment-inner-div' className={appointment.completed ? 'completed' : ''}>
                    {appointment.appointment_type}
                    <br />
                    {appointment.description}
                </div>
            ))}
        </div>
    );
}
export default MyAppointments;
