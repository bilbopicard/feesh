import React, { useState, useEffect } from "react";
// import { useParams, NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { displayAppointments } from "../store/appointments";
import './styles/homepage.css'
import HomeBlurb from './HomeBlurb';
import feedingImage from '../images/feeding-image.svg';
import trainingImage from '../images/training-image.svg';
import dropInImage from '../images/drop-in-image.svg';
import healthImage from '../images/health-image.svg';
import sittingImage from '../images/sitting-image.svg';
import boardingImage from '../images/boarding-image.svg';
// import Map from './Map';

function Homepage() {

    const dispatch = useDispatch();
    const [active, setActive] = useState('feeding');

    const divClick = (e) => {
        const clicked = e.target.id;
        // console.log(clicked)
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
        <>
            <div className='nav-empty-div'></div>
            <div id='homepage-outer-container'>
                <h1 id='homepage-h1'>Feesh</h1>
                <div id='appointment-type-container'>
                    <div className={`home-inner-type-div ${active === 'feeding' ? 'active' : ''}`} id='feeding' onClick={divClick}>
                        Feeding
                    <img src={feedingImage} alt="" id='feeding' />
                    </div>
                    <div className={`home-inner-type-div ${active === 'training' ? 'active' : ''}`} id='training' onClick={divClick}>
                        Training
                    <img src={trainingImage} alt="" id='training' />
                    </div>
                    <div className={`home-inner-type-div ${active === 'drop-in' ? 'active' : ''}`} id='drop-in' onClick={divClick}>
                        Drop-In
                    <img src={dropInImage} alt="" id='drop-in' />
                    </div>
                    <div className={`home-inner-type-div ${active === 'health' ? 'active' : ''}`} id='health' onClick={divClick}>
                        Health Check
                    <img src={healthImage} alt="" id='health' />
                    </div>
                    <div className={`home-inner-type-div ${active === 'sitting' ? 'active' : ''}`} id='sitting' onClick={divClick}>
                        Sitting
                    <img src={sittingImage} alt="" id='sitting' />
                    </div>
                    <div className={`home-inner-type-div ${active === 'boarding' ? 'active' : ''}`} id='boarding' onClick={divClick}>
                        Boarding
                    <img src={boardingImage} alt="" id='boarding' />
                    </div>
                    <div id='homepage-lower-div'>
                        <HomeBlurb active={active} />
                    </div>
                </div>
                {/* <h3 id='homepage-h3'> - We feed fish</h3> */}
                {/* <p>
                What is Feesh? Why is Feesh? These are valid questions.
            </p> */}
            </div>
        </>
    );
}
export default Homepage;
