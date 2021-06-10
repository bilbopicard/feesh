import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { displayAppointments } from "../store/appointments";
// import Map from './Map';
// import HomeBlurb from './HomeBlurb';
import './styles/homepage.css'
import './styles/myAppointments.css';

function MyAppointments() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user.username)
    const userId = useSelector(state => state.session.user.id)

    const [active, setActive] = useState('upcoming-appointments')

    const myAppointments = useSelector(state => {
        return state.appointments.list.map(appointmentId => state.appointments[appointmentId]).filter(appointment => appointment.user_id === userId)
    })
    const myUpcomingAppointments = myAppointments.filter(appointment => appointment['completed'] === false)
    const myCompletedAppointments = myAppointments.filter(appointment => appointment['completed'] === true)

    const allMyFeeshing = useSelector(state => {
        return state.appointments.list.map(appointmentId => state.appointments[appointmentId]).filter(appointment => appointment.feeder_id === userId)
    })
    const myUpcomingFeeshing = allMyFeeshing.filter(appointment => appointment['completed'] === false)
    const myCompletedFeeshing = allMyFeeshing.filter(appointment => appointment['completed'] === true)

    // console.log(myCompletedAppointments)

    const niceDateFormat = (aptDate) => {
        let d = new Date(aptDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        //     hh = d.getHours(),
        //     m = d.getMinutes();

        // let dd = "AM";
        // let h = hh;
        // if (h >= 12) {
        //     h = hh - 12;
        //     dd = "PM";
        // }
        // if (h === 0) {
        //     h = 12;
        // }
        // m = m < 10 ? "0" + m : m;

        return [[month, day, year].join('-')];
    }

    const changeVisible = (e) => {
        e.preventDefault()
        const clicked = e.target.id;
        console.log(clicked)
        if (active === clicked) {
            setActive(active)
        } else {
            setActive(clicked)
        }
        // console.log(active)
    }

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    return (
        <>
            <div className='nav-empty-div'></div>
            <div id='my-appointment-outer-div'>
                <h1 id='my-appointments-h1'>{user}'s Calendar</h1>
                <div id='my-appointments-top-links'>
                    <div id='upcoming-appointments' className={`my-appointments-top-link ${active === 'upcoming-appointments' ? '' : 'no-border'}`} onClick={changeVisible}><h2 id='upcoming-appointments'>Upcoming Appointments</h2></div>
                    <div className={`my-appointments-top-link ${active === 'completed-appointments' ? '' : 'no-border'}`} id='completed-appointments' onClick={changeVisible}><h2 id='completed-appointments'>Completed Appointments</h2></div>
                    <div className={`my-appointments-top-link ${active === 'upcoming-feeshing-trips' ? '' : 'no-border'}`} id='upcoming-feeshing-trips' onClick={changeVisible}><h2 id='upcoming-feeshing-trips'>Upcoming Feeshing Trips</h2></div>
                    <div className={`my-appointments-top-link ${active === 'completed-feeshing-trips' ? '' : 'no-border'}`} id='completed-feeshing-trips' onClick={changeVisible}><h2 id='completed-feeshing-trips'>Completed Feeshing Trips</h2></div>
                </div>
                <div id='my-appointments-flex-container'>
                    <div id='not-completed' className={`${active === 'upcoming-appointments' ? '' : 'hidden'}`}>
                        {myUpcomingAppointments.length ? myUpcomingAppointments.map(appointment => (
                            <NavLink key={appointment.id} className='my-appointments-link' to={`/appointments/${appointment.id}`}>
                                <div className='my-appointment-inner-div'>
                                    <p>Type: {appointment.appointment_type}</p>
                                    <p>Date: {niceDateFormat(appointment.date)}</p>
                                    {/* <p>Time: {appointment.time}</p>
                                    <p>Description: {appointment.description}</p> */}
                                </div>
                            </NavLink>
                        )) : <h2>No Upcoming Appointments</h2>}
                    </div>
                    <div id='completed' className={`${active === 'completed-appointments' ? '' : 'hidden'}`}>
                        {myCompletedAppointments.length ? myCompletedAppointments.map(appointment => (
                            <NavLink key={appointment.id} className='my-appointments-link' to={`/appointments/${appointment.id}`}>
                                <div className='my-appointment-inner-div' key={appointment.id}>
                                    <p>Type: {appointment.appointment_type}</p>
                                    <p>Date: {niceDateFormat(appointment.date)}</p>
                                    {/* <p>Time: {appointment.time}</p>
                                    <p>Description: {appointment.description}</p> */}
                                    <p>Feeder: {appointment.feeder}</p>
                                </div>
                            </NavLink>
                        )) : <h2>No Completed Appointments</h2>}
                    </div>
                    <div id='upcoming-feeshing' className={`${active === 'upcoming-feeshing-trips' ? '' : 'hidden'}`}>
                        {myUpcomingFeeshing.length ? myUpcomingFeeshing.map(appointment => (
                            <NavLink key={appointment.id} className='my-appointments-link' to={`/appointments/${appointment.id}`}>
                                <div className='my-appointment-inner-div' key={appointment.id}>
                                    <p>Type: {appointment.appointment_type}</p>
                                    <p>Date: {niceDateFormat(appointment.date)}</p>
                                    {/* <p>Time: {appointment.time}</p>
                                    <p>Description: {appointment.description}</p>
                                    <p>Feeder: {appointment.feeder}</p> */}
                                </div>
                            </NavLink>
                        )) : <h2>No Upcoming Feeshing Trips</h2>}
                    </div>
                    <div id='completed-feeshing' className={`${active === 'completed-feeshing-trips' ? '' : 'hidden'}`}>
                        {myCompletedFeeshing.length ? myCompletedFeeshing.map(appointment => (
                            <NavLink key={appointment.id} className='my-appointments-link' to={`/appointments/${appointment.id}`}>
                                <div className='my-appointment-inner-div' key={appointment.id}>
                                    <p>Type: {appointment.appointment_type}</p>
                                    <p>Date: {niceDateFormat(appointment.date)}</p>
                                    {/* <p>Time: {appointment.time}</p>
                                    <p>Description: {appointment.description}</p>
                                    <p>Feeder: {appointment.feeder}</p> */}
                                </div>
                            </NavLink>
                        )) : <h2>No Completed Feeshing Trips</h2>}
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyAppointments;
