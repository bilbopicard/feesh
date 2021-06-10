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

    // console.log(otherUserAppointments)
    return (
        <>
            <div className='nav-empty-div'></div>
            <h1 id='find-feeshing-h1'>Find Feeshing Trips</h1>
            <div id='find-appointment-container'>
                <div id='find-appointment-left-div'>
                    {otherUserAppointments.map(appointment => (
                        <div id='find-appointment-left-inner'>
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