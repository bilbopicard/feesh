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

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    // console.log(otherUserAppointments)
    return (
        <>
            <div className='nav-empty-div'></div>
            <div id='find-appointment-container'>
                <div id='find-appointment-left-div'>
                    {otherUserAppointments.map(appointment => (
                        <NavLink to={`/appointments/${appointment.id}`} key={appointment.id}>
                            <div className={`find-appointment-inner-div ${appointment.completed} ? 'completed' : ''}`} key={appointment.id}>
                                <div className='find-appointment-inner-text'>
                                    <p>Type of appointment: {appointment.appointment_type}</p>
                                    <br />
                                    <p>Description: {appointment.description}</p>
                                </div>
                                <div id='find-appointment-image-div'>
                                    <img src={appointment.image_url} alt="" />
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
                <div id='find-appointment-right-div'>
                    <GoogleApiWrapper />
                </div>
            </div>
        </>
    )
}

export default FindAppointments;