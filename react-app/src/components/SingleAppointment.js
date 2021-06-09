import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { displayAppointments, deleteAppointment } from "../store/appointments";
import { allReviews } from '../store/reviews';
import { createReview } from '../store/reviews';
import { updateAppointment } from '../store/appointments';
import './styles/singleAppointment.css';

function SingleAppointment() {

    const [rating, setRating] = useState(3)
    const [content, setContent] = useState('')

    const { appointmentId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const thisAppointment = useSelector(state => state.appointments[appointmentId])
    const isUserFeeder = useSelector(state => state.session.user.feeder)
    const userId = useSelector(state => state.session.user.id)


    const reviewed = useSelector(state => {
        return state.reviews.list.map(reviewId => state.reviews[reviewId]).filter(review => review.appointment_id === thisAppointment?.id)
    })
    // console.log(reviewed)

    const editAppointment = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        history.push(`/appointments/${e.target.id}/edit`)
    }

    const cancelAppointment = (e) => {
        e.preventDefault()
        let appointmentId = e.target.id
        const payload = {
            appointmentId
        }
        dispatch(deleteAppointment(payload))
        history.push('/appointments')
    }
    // const timeFormat = new Date('1970-01-01T' + thisAppointment?.time)

    // console.log(timeFormat.getTime())

    // let date = new Date(timeFormat.getTime() * 1000);

    // console.log(date)

    // let hours = date.getHours();
    // // Minutes part from the timestamp
    // let minutes = "0" + date.getMinutes();
    // // Seconds part from the timestamp
    // let seconds = "0" + date.getSeconds();

    // let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    // console.log(formattedTime)

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

    const submitReview = (e) => {
        e.preventDefault()
        const payload = {
            user_id: userId,
            feeder_id: thisAppointment?.feeder_id,
            appointment_id: thisAppointment?.id,
            rating,
            content
        }
        dispatch(createReview(payload))
        history.push('/appointments')
    }
    // console.log(thisAppointment?.date)
    const respondToAppointment = (e) => {
        e.preventDefault()
        const payload = {
            description: thisAppointment?.description,
            date: new Date(thisAppointment?.date).toISOString().split('T')[0],
            time: thisAppointment?.time.slice(0, 5),
            streetAddress: thisAppointment?.street_address,
            city: thisAppointment?.city,
            fishTypeId: thisAppointment?.fish_type_id,
            zipCode: thisAppointment?.zip_code,
            userId: thisAppointment?.user_id,
            appointmentTypeId: thisAppointment?.appointment_type_id,
            imageUrl: thisAppointment?.image_url,
            appointmentId: thisAppointment?.id,
            feeder_id: userId
        }
        dispatch(updateAppointment(payload))
    }

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    useEffect(() => {
        dispatch(allReviews())
    }, [dispatch])

    return (
        <>
            <div className='nav-empty-div'></div>
            <h1 id='single-appointment-h1'>Appointment Information</h1>
            <div id='single-appointment-container'>
                <div id='single-appointment-left'>
                    <p>Type: {thisAppointment?.appointment_type}</p>
                    <p>Date: {niceDateFormat(thisAppointment?.date)}</p>
                    <p>Time: {thisAppointment?.time}</p>
                    <p>Description: {thisAppointment?.description}</p>
                    <p>Address: {thisAppointment?.street_address}</p>
                    <p>City: {thisAppointment?.city}</p>
                    <p>Zip Code: {thisAppointment?.zip_code}</p>
                    {thisAppointment?.feeder ? <p>Feeder: {thisAppointment?.feeder}</p> : ''}
                </div>
                <div id='single-appointment-right'>
                    <img src={thisAppointment?.image_url} />
                </div>
            </div>
            <div id='single-appointment-bottom'>
                {thisAppointment?.user_id === userId && !thisAppointment?.completed && <form id='two-btns-form'>
                    <button id={thisAppointment.id} onClick={editAppointment}>Edit this appointment</button>
                    <button id={thisAppointment.id} onClick={cancelAppointment}> {`Cancel ${thisAppointment.appointment_type}`}</button>
                </form>}
                {thisAppointment?.user_id === userId && thisAppointment?.completed && <form onSubmit={submitReview}>
                    <label htmlFor="">Rating</label>
                    <input type="number" min='1' max='5' value={rating} onChange={e => setRating(e.target.value)} />
                    <label>Feedback</label>
                    <textarea name="content" id="" cols="30" rows="10" value={content} onChange={e => setContent(e.target.value)} placeholder='Leave feedback...'></textarea>
                    {!reviewed.length ? <button id={thisAppointment.id} type='submit'> {`Leave review for ${thisAppointment.feeder}`}</button> : <button disabled='true'>Already reviewed</button>}
                </form>}
                {thisAppointment?.user_id !== userId && thisAppointment?.feeder_id === null && isUserFeeder ? <button onClick={respondToAppointment}>{`I can respond to this ${thisAppointment.appointment_type}`}</button> : ''
                }
                {thisAppointment?.user_id !== userId && thisAppointment?.feeder_id === userId && !thisAppointment?.completed ? <button onClick={respondToAppointment}>{`I\'ve Completed This`}</button> : ''
                }
            </div>

        </>
    )
}

export default SingleAppointment;