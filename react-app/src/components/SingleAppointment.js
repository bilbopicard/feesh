import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { displayAppointments, deleteAppointment } from "../store/appointments";
import { allReviews } from '../store/reviews';
import { createReview, deleteReview, editReview } from '../store/reviews';
import { updateAppointment } from '../store/appointments';
import './styles/singleAppointment.css';
import starfish from '../images/starfish.svg'

function SingleAppointment() {

    const [rating, setRating] = useState()
    const [content, setContent] = useState()
    const [edit, setEdit] = useState(false)

    const { appointmentId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    const thisAppointment = useSelector(state => state.appointments[appointmentId])
    const isUserFeeder = useSelector(state => state.session.user.feeder)
    const userId = useSelector(state => state.session.user.id)


    let reviewed = useSelector(state => {
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
        // history.push('/appointments')
    }

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

    const completedAppointment = (e) => {
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
            feeder_id: userId,
            completed: true
        }
        dispatch(updateAppointment(payload))
        history.push('/appointments')
    }

    // const toggle = () => setEdit(!edit)

    const editThisReview = (e) => {
        e.preventDefault()
        setEdit(!edit)
    }

    const updateReview = async (e) => {
        e.preventDefault();

        const payload = {
            appointment_id: reviewed[0]?.appointment_id,
            feeder_id: reviewed[0]?.feeder_id,
            user_id: userId,
            rating: rating,
            content: content,
            id: reviewed[0]?.id
        }
        dispatch(editReview(payload))
        dispatch(allReviews())
        setEdit(!edit)
    }

    useEffect(() => {
        setRating(reviewed[0]?.rating)
        setContent(reviewed[0]?.content)
    }, [edit])

    const deleteThisReview = (e) => {
        e.preventDefault()
        dispatch(deleteReview({ reviewId: e.target.id }))
        setRating('')
        setContent('')
    }

    const renderRating = (rating) => {

        if (rating === 5) {
            return (
                <div>
                    <img src={starfish} alt={`Small starfish`} />
                    <img src={starfish} alt={`Small starfish`} />
                    <img src={starfish} alt={`Small starfish`} />
                    <img src={starfish} alt={`Small starfish`} />
                    <img src={starfish} alt={`Small starfish`} />
                </div>
            )
        } else if (rating === 4) {
            return (
                <div>
                    <img src={starfish} alt={`Small starfish`} />
                    <img src={starfish} alt={`Small starfish`} />
                    <img src={starfish} alt={`Small starfish`} />
                    <img src={starfish} alt={`Small starfish`} />
                </div>
            )
        } else if (rating === 3) {
            return (
                <div>
                    <img src={starfish} alt={`Small starfish`} />
                    <img src={starfish} alt={`Small starfish`} />
                    <img src={starfish} alt={`Small starfish`} />
                </div>
            )
        } else if (rating === 2) {
            return (
                <div>
                    <img src={starfish} alt={`Small starfish`} />
                    <img src={starfish} alt={`Small starfish`} />
                </div>
            )
        } else if (rating === 1) {
            return (
                <div>
                    <img src={starfish} alt={`Small starfish`} />
                </div>
            )
        }
    }

    // console.log(reviewed.length)

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
                    <p>Time: {thisAppointment?.time.slice(0, 5)}</p>
                    <p>Description: {thisAppointment?.description}</p>
                    <p>Fish Type: {thisAppointment?.fish_type}</p>
                    <p>Address: {thisAppointment?.street_address}</p>
                    <p>City: {thisAppointment?.city}</p>
                    <p>Zip Code: {thisAppointment?.zip_code}</p>
                    {thisAppointment?.feeder ? <p>Feesher: {thisAppointment?.feeder}</p> : <p>Feesher: None</p>}
                </div>
                <div id='single-appointment-right'>
                    <img src={thisAppointment?.image_url} />
                </div>
                {thisAppointment?.completed ?
                    <div id='single-appointment-reviews'>
                        {reviewed.length === 0 && thisAppointment?.user_id === userId && edit === false ? <div id='review-form-div'><form onSubmit={submitReview}>
                            <label>Feedback</label>
                            <textarea name="content" id="" cols="30" rows="5" value={content || ''} onChange={e => setContent(e.target.value)} placeholder='Leave feedback...' required></textarea>
                            <label htmlFor="">Rating</label>
                            <input type="number" min='1' max='5' value={rating || ''} onChange={e => setRating(e.target.value)} required />
                            <br />
                            <div id='review-btns-edit-delete'>
                                <button id={thisAppointment.id} type='submit'>{`Review ${thisAppointment.feeder}`}</button>
                            </div>
                        </form></div> : ''}

                        {reviewed.length > 0 && thisAppointment?.completed && edit === false ? <div id='reviews-text-div'>
                            <p>"{reviewed[0]?.content}"</p>
                            <div id='starfish-div'>{renderRating(reviewed[0]?.rating)}</div>

                            {thisAppointment.user_id === userId && <div id='review-btns-edit-delete'>
                                <button id={reviewed[0]?.id} onClick={editThisReview}>Edit</button>
                                <button id={reviewed[0]?.id} onClick={deleteThisReview}>Delete</button>
                            </div>}
                        </div> : ''}

                        {edit === true ? <div id='review-form-div'><form onSubmit={updateReview}>
                            <label>Feedback</label>
                            <textarea name="content" id="" cols="30" rows="5" value={content || ''} onChange={e => setContent(e.target.value)} placeholder='Leave feedback...' required></textarea>
                            <label htmlFor="">Rating</label>
                            <input type="number" min='1' max='5' value={rating || ''} onChange={e => setRating(e.target.value)} />
                            <br />
                            <div id='review-btns-edit-delete'>
                                <button id={thisAppointment.id} type='submit'>{`Edit review`}</button>
                            </div>
                        </form></div> : ''}
                    </div> : ''}
            </div>

            <div id='single-appointment-bottom'>

                {thisAppointment?.user_id === userId && !thisAppointment?.completed && <form id='two-btns-form'>
                    <button id={thisAppointment.id} onClick={editAppointment}>Edit this appointment</button>
                    <button id={thisAppointment.id} onClick={cancelAppointment}> {`Cancel ${thisAppointment.appointment_type}`}</button>
                </form>}

                {thisAppointment?.user_id !== userId && thisAppointment?.feeder_id === null && isUserFeeder ? <button onClick={respondToAppointment}>{`I can respond to this ${thisAppointment.appointment_type}`}</button> : ''
                }
                {thisAppointment?.user_id !== userId && thisAppointment?.feeder_id === userId && !thisAppointment?.completed ? <button onClick={completedAppointment}>{`I've Completed This`}</button> : ''
                }

            </div>

        </>
    )
}

export default SingleAppointment;