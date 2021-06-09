import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import NewAppointmentForm from './NewAppointmentForm';
import './styles/newAppointment.css'

function NewAppointment() {

    let { type } = useParams()

    type = type[0].toUpperCase() + type.slice(1)

    return (
        <>
            <div className="nav-empty-div"></div>
            <div id='new-appointment-outer-div'>
                <h2>{type} Form</h2>
                <NewAppointmentForm type={type} />
            </div>
        </>
    );
}
export default NewAppointment;
