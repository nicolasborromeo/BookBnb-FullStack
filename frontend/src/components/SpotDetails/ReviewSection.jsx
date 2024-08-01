import ReviewSummaryInfo from "./ReviewSummaryInfo"
import { reviewDateFormatter } from './helperFunctions'
import './ReviewSection.css'
import { useEffect, useState } from "react"
import OpenModalButton from '../OpenModalButton'
import PostReviewForm from '../PostReviewForm'
import {useSelector} from 'react-redux'

const ReviewSection = ({ spot, user, reviewInfoFormatter }) => {
    const [hasReviewed, setHasReviewed] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const Reviews = useSelector(state => state.spots.currentSpot?.Reviews)



    useEffect(()=> {
        Reviews.forEach(rev => {
            if(rev.userId === user?.id) return setHasReviewed(true)
        })
    }, [spot, user, Reviews])

    useEffect(()=> {
        if(spot.ownerId === user?.id) return setIsOwner(true)
    }, [spot, user])

    return (
        <>
            <div className="sd-reviews-header">
                <ReviewSummaryInfo reviewInfoFormatter={reviewInfoFormatter} />
            </div>
            { user && !hasReviewed && !isOwner &&
                <OpenModalButton
                    buttonText={'Post Your Review'}
                    modalComponent={<PostReviewForm />}
                />

            }
            <ReviewsList  spot={spot}/>
        </>
    )
}


const ReviewsList = ({ spot }) => {
    const Reviews = useSelector(state => state.spots.currentSpot?.Reviews)
    const user = useSelector(state=> state.session.user)
    if(Reviews) return (
        <div className="sd-reviews-container">
            <ul className="sd-review-list">
                {
                    Reviews.length >= 1 &&
                    (
                        Reviews.slice().reverse().map(review => (
                            <li key={review.id} className="sd-individual-review">
                                <p className="review-user" style={{ fontWeight: '500' }}>{review.User.firstName}</p>
                                <p className="review-date">{reviewDateFormatter(review.createdAt)}</p>
                                <p className="review-text">{review.review}</p>
                            </li>
                        ))
                    )
                }

            </ul>
            {
            (user && !Reviews.length && spot.Owner.id !== user.id
            ) && (
            <h3 style={{ fontWeight: '300' }}>
                Be the first to post a review!
            </h3>
            )}
        </div>
    )
}
export default ReviewSection
