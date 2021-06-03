import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import NewAppointmentForm from './NewAppointmentForm';


function NewAppointment() {

    let { type } = useParams()

    type = type[0].toUpperCase() + type.slice(1)

    return (
        <div>
            <h1>{type} Form</h1>
            <NewAppointmentForm type={type} />
        </div>
    );
}
export default NewAppointment;
