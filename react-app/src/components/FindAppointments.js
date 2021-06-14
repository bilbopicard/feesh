import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import GoogleApiWrapper from './Map';
import { displayAppointments } from "../store/appointments";
import './styles/findAppointments.css'

function FindAppointments() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id)
    const otherUserAppointments = useSelector(state => {
        return state.appointments.list.map(appointmentId => state.appointments[appointmentId]).filter(appointment => appointment.user_id !== userId)
    })

    const notCompletedAppointments = otherUserAppointments.filter(appointment => !appointment.completed && !appointment.feeder)

    const niceDateFormat = (aptDate) => {
        let d = new Date(aptDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        return [[month, day, year].join('-')];
    }

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    // console.log(otherUserAppointments)
    return (
        <>
            <div className='nav-empty-div'></div>
            <h1 id='find-feeshing-h1'>Find Feeshing Trips</h1>
            <div id='find-appointment-container'>
                <div id='find-appointment-left-div'>
                    {notCompletedAppointments.length ? notCompletedAppointments.map(appointment => (
                        <div id='find-appointment-left-inner' key={appointment.id}>
                            <NavLink to={`/appointments/${appointment.id}`} key={appointment.id}>
                                <div className={`find-appointment-inner-div ${appointment.completed} ? 'completed' : ''}`} key={appointment.id}>
                                    <div className='find-appointment-inner-text'>
                                        <p>Type of appointment: {appointment.appointment_type}</p>
                                        <p>Description: {appointment.description}</p>
                                        <p>Date: {niceDateFormat(appointment.date)}</p>
                                        <p>Type of fish: {appointment.fish_type}</p>
                                    </div>
                                    <div id='find-appointment-image-div'>
                                        <img src={appointment.image_url} alt="" />
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )) : <h2 id='no-appointments'>No Feeshing Trips Available</h2>}
                </div>
                <div id='find-appointment-right-div'>
                    <GoogleApiWrapper />
                </div>
            </div>
        </>
    )
}

export default FindAppointments;