import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { displayAppointments } from "../store/appointments";
import './styles/homepage.css'
import HomeBlurb from './HomeBlurb';

function Homepage() {

    const dispatch = useDispatch();
    const [active, setActive] = useState('feeding');

    const divClick = (e) => {
        const clicked = e.target.id;
        console.log(clicked)
        if (active === clicked) {
            setActive(active)
        } else {
            setActive(clicked)
        }
    }

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    return (
        <div>
            <h1 id='homepage-h1'>Feesh</h1>
            <h3 id='homepage-h3'>We feed fish</h3>
            <div id='appointment-type-container'>
                <div className={`home-inner-type-div ${active === 'feeding' ? 'active' : ''}`} id='feeding' onClick={divClick}>Feeding</div>
                <div className={`home-inner-type-div ${active === 'training' ? 'active' : ''}`} id='training' onClick={divClick}>Training</div>
                <div className={`home-inner-type-div ${active === 'drop-in' ? 'active' : ''}`} id='drop-in' onClick={divClick}>Drop-In</div>
                <div className={`home-inner-type-div ${active === 'health' ? 'active' : ''}`} id='health' onClick={divClick}>Health</div>
                <div className={`home-inner-type-div ${active === 'sitting' ? 'active' : ''}`} id='sitting' onClick={divClick}>Sitting</div>
                <div className={`home-inner-type-div ${active === 'boarding' ? 'active' : ''}`} id='boarding' onClick={divClick}>Boarding</div>
                <div id='homepage-lower-div'>
                    <HomeBlurb active={active} />
                </div>
            </div>
        </div>
    );
}
export default Homepage;
