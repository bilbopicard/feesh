import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { displayAppointments, deleteAppointment } from "../store/appointments";
import { createReview } from '../store/reviews';

function SingleAppointment() {

    const [rating, setRating] = useState(3)
    const [content, setContent] = useState('')

    const dispatch = useDispatch();
    const history = useHistory();
    const { appointmentId } = useParams();
    // console.log(appointmentId)

    const thisAppointment = useSelector(state => state.appointments[appointmentId])
    const userId = useSelector(state => state.session.user.id)

    const editAppointment = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        history.push(`/appointments/${e.target.id}/edit`)
    }

    const cancelAppointment = (e) => {
        e.preventDefault()
        // console.log(e.target.id)
        let appointmentId = e.target.id
        const payload = {
            appointmentId
        }
        dispatch(deleteAppointment(payload))
        history.push('/appointments')
    }

    const submitReview = (e) => {
        e.preventDefault()
        const payload = {
            user_id: userId,
            feeder_id: thisAppointment?.feeder_id,
            rating,
            content
        }
        dispatch(createReview(payload))
        history.push('/appointments')
    }

    useEffect(() => {
        dispatch(displayAppointments())
    }, [dispatch])

    return (
        <>
            <div className='nav-empty-div'></div>
            <div>
                <h1>I'm a single component</h1>
                {thisAppointment?.appointment_type}
                {thisAppointment?.date}
                {thisAppointment?.user_id === userId && !thisAppointment?.completed && <form >
                    <button id={thisAppointment.id} onClick={editAppointment}>Edit this appointment</button>
                    <button id={thisAppointment.id} onClick={cancelAppointment}> {`Cancel ${thisAppointment.appointment_type}`}</button>
                </form>}
                {thisAppointment?.user_id === userId && thisAppointment?.completed && <form onSubmit={submitReview}>
                    <label htmlFor="">Rating</label>
                    <input type="number" min='1' max='5' value={rating} onChange={e => setRating(e.target.value)} />
                    <label>Feedback</label>
                    <textarea name="content" id="" cols="30" rows="10" value={content} onChange={e => setContent(e.target.value)} placeholder='Leave feedback...'></textarea>
                    <button id={thisAppointment.id} type='submit'> {`Leave review for ${thisAppointment.feeder}`}</button>
                </form>}
            </div>
        </>
    )
}

export default SingleAppointment;