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
    const myUpcomingAppointments = myAppointments.filter(appointment => appointment['completed'] === false)
    const myCompletedAppointments = myAppointments.filter(appointment => appointment['completed'] === true)
    console.log(myCompletedAppointments)

    const niceDateFormat = (aptDate) => {
        let d = new Date(aptDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hh = d.getHours(),
            m = d.getMinutes();

        let dd = "AM";
        let h = hh;
        if (h >= 12) {
            h = hh - 12;
            dd = "PM";
        }
        if (h === 0) {
            h = 12;
        }
        m = m < 10 ? "0" + m : m;

        return [[month, day, year].join('-')];
    }

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    return (
        <>
            <div class='nav-empty-div'></div>
            <div id='my-appointment-outer-div'>
                <h2>{user}'s Profile</h2>
                <h1 id='my-appointments-h1'>My Appointments</h1>
                <div id='my-appointments-flex-container'>
                    <div id='not-completed'>
                        <h2>Upcoming Appointments</h2>
                        {myUpcomingAppointments.map(appointment => (
                            <NavLink className='my-appointments-link' to={`/appointments/${appointment.id}`}>
                                <div className='my-appointment-inner-div' key={appointment.id}>
                                    <p>Date: {niceDateFormat(appointment.date)}</p>
                                    <p>Time: {appointment.time}</p>
                                    <p>Type: {appointment.appointment_type}</p>
                                    <p>Description: {appointment.description}</p>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div id='completed'>
                        <h2>Completed Appointments</h2>
                        {myCompletedAppointments.map(appointment => (
                            <NavLink className='my-appointments-link' to={`/appointments/${appointment.id}`}>
                                <div className='my-appointment-inner-div' key={appointment.id}>
                                    <p>Date: {niceDateFormat(appointment.date)}</p>
                                    <p>Time: {appointment.time}</p>
                                    <p>Type: {appointment.appointment_type}</p>
                                    <p>Description: {appointment.description}</p>
                                    <p>Feeder: {appointment.feeder}</p>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyAppointments;
