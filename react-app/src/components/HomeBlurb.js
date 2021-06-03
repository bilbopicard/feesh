import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { displayAppointments } from "../store/appointments";

function HomeBlurb({ active }) {

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(displayAppointments())
    // }, [dispatch])

    let insideText = active[0].toUpperCase() + active.slice(1)

    let text = '';

    if (active === 'feeding') {
        text = 'Are you busy? Need a little extra help feeding your fish? We have certified feeders standing by to help you.'
    } else if (active === 'training') {
        text = 'Are your fish a little wild? We can help with that. We have trainers standing by.'
    } else if (active === 'drop-in') {
        text = 'Worried that your fish are going to be alone for an extended period of time? Have a certified person stop by to check in and hang out with them.'
    } else if (active === 'health') {
        text = 'Do you have some sick fish? We have vets standing by that can help. Schedule a health check up.'
    } else if (active === 'sitting') {
        text = 'Are you leaving town and worried about leaving your fish all alone? We have certified fish sitters that can watch them while you are out of town.'
    } else if (active === 'boarding') {
        text = 'Do you not want to leave fish home alone? Want them to be cozy in a safe and loving environment with certified fish care givers? Schedule a date for your pet to be boarded.'
    }

    return (
        <div>
            <p>{text}</p>
            <NavLink to={`/appointments/new/${active}`}>{insideText}</NavLink>
        </div>
    );
}
export default HomeBlurb;
