import { IoStar } from "react-icons/io5";
import { useEffect, useState } from "react";
import './PostReviewForm.css'
import { useModal } from '../../context/Modal'
import { IoClose } from "react-icons/io5";
import * as spotActions from '../../store/spots'
import { useDispatch, useSelector } from "react-redux";


function PostReviewForm() {
    const spot = useSelector(state => state.spots.currentSpot)
    const spotId = spot.id
    const dispatch = useDispatch()
    const { setModalContent } = useModal()
    const [rating, setRating] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [review, setReview] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const newReview = {
            review: review,
            stars: rating
        }
        dispatch(spotActions.postReview(newReview, spotId))
            .then((res) => {
                console.log('New Review added succesfully: ',res)
                setModalContent(null)}
            )
            .catch(async (err) => {
                let error = await err.json()
                setErrors({...error.errors})
            })
    }

    const resetInputs = () => {
        setModalContent(null)
        setReview('')
        setRating(null)
    }

    useEffect(()=> {
        console.log(review.length)
        setDisabled(review.length > 10 ? false : true)
    }, [review])

    return (
        <>
            <form className="post-review-container" onSubmit={handleSubmit}>
                <span className='close-modal-x' onClick={resetInputs}><IoClose /></span>
                <h1 className="post-review-title">How was your stay?</h1>
                {errors && Object.values(errors).map((err, i) => ( <p key={i} style={{lineHeight: '0'}}className="error-msg">{err}</p>))}
                <textarea className='post-review-textarea' placeholder="Leave your review here..."
                    onChange={(e) => setReview(e.target.value)}
                />
                <StarRating rating={rating} setRating={setRating} />
                <button
                    className="post-review-submit-button"
                    disabled={disabled}
                    type="submit">
                        Submit Review
                </button>
            </form>
        </>
    )
}

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(null)

    return (
        < div className="post-review-stars-container">
            <div className="post-review-stars">
                {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1
                    return (

                        <label key={index} className="stars">
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                name='rating'
                                value={currentRating}
                                onClick={() => {
                                    setRating(currentRating)
                                }}
                            />
                            <IoStar
                                size={30}
                                className='star'
                                color={currentRating <= (hover || rating) ? '#ffc107' : "#e4e5e9"}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    )
                })}
            </div>
            <span style={{color: rating ? 'black' : 'lightgray'}}>Stars</span>
        </div>
    )
}

export default PostReviewForm
