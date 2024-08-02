import './ReviewSection.css'
import * as spotSession from '../../store/spots'
import { reviewDateFormatter } from './helperFunctions'
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { FaRegUser } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import PostReviewForm from '../PostReviewForm'
import OpenModalButton from '../OpenModalButton'
import ReviewSummaryInfo from "./ReviewSummaryInfo"
import ConfirmDeleteModal from "../ConfirmDeleteModal"


const ReviewSection = ({ spot, user }) => {
    const [hasReviewed, setHasReviewed] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const Reviews = useSelector(state => state.spots.spotReviewsArray)

    useEffect(() => {
        setHasReviewed(false)
        if (user) {
            Reviews.forEach(rev => {
                if (rev.userId === user?.id) return setHasReviewed(true)
            })
        }
    }, [spot, user, Reviews])

    useEffect(() => {
        if (spot.ownerId === user?.id) return setIsOwner(true)
        else return setIsOwner(false)
    }, [spot, user])

    return (
        <>
            <div className="sd-reviews-header">
                <div className="review-summary-header">
                    <ReviewSummaryInfo />
                    {(user.id === spot.Owner.id && !Reviews.length) && <h3 className='review-section-empty-reviews-message'>Your stay doesn&apos;t have any reviews yet</h3>}
                </div>
                {user && !hasReviewed && !isOwner &&
                    <div className="post-your-review-button">
                        <OpenModalButton
                            style={{ backgroundColor: 'transparent', color: 'black', borderRadius: '8px', padding: ' 13px 23px', outline:'none', border: '1px solid black', marginTop: '10px', fontSize: '16px', cursor:'pointer' }}
                            buttonText={'Post Your Review'}
                            modalComponent={<PostReviewForm />}
                        />
                    </div>
                }
            </div>
            <ReviewsList spot={spot} />
        </>
    )
}


const ReviewsList = ({ spot }) => {
    const Reviews = useSelector(state => state.spots.spotReviewsArray)
    const user = useSelector(state => state.session.user)

    if (Reviews) return (
        <div className="sd-reviews-container">
            <ul className="sd-review-list">
                {
                    Reviews.length >= 1
                    &&
                    (
                        Reviews.slice().reverse().map(review => {
                            return (
                                <>
                                    <li key={review.id} className="sd-individual-review">

                                        <div className="review-user-logo-name-container">
                                            <FaRegUser className='review-user-logo-icon' size={15} />
                                            <p className="review-user" style={{ fontWeight: '600', fontSize: '1em' }}>{review.User.firstName}</p>
                                        </div>

                                        <div className="review-stars-and-date-container">
                                            <ReviewStarRating review={review} />
                                            <span>·</span>
                                            <p className="review-date">{reviewDateFormatter(review.createdAt)}</p>
                                        </div>

                                        <p className="review-text">{review.review}</p>

                                        {user?.id === review.User.id
                                            &&
                                            <div className="reviews-list-delete-button">
                                                <OpenModalButton
                                                    style={{ backgroundColor: 'black', color: 'white', borderRadius: '8px', padding: ' 9px 15px', border: '0', marginTop: '10px' }}
                                                    buttonText={'Delete'}
                                                    modalComponent={
                                                        <ConfirmDeleteModal
                                                            thing={'review'}
                                                            action={spotSession.deleteReview}
                                                            actionIdentifier={review.id}
                                                        />
                                                    }
                                                />
                                            </div>
                                        }
                                    </li>
                                </>
                            )
                        })
                    )
                }

            </ul>
            {
                (user && !Reviews.length && spot.Owner.id !== user.id
                ) && (
                    <h3 className='review-section-empty-reviews-message'>
                        Be the first to post a review!
                    </h3>
                )
            }

        </div>
    )
}

const ReviewStarRating = ({ review }) => {
    console.log('review in str raing', review)
    let { stars } = review
    return (
        <div className="review-star-rating-stars">
            {[...Array(5)].map((star, index) => (
                <IoStar
                    key={index}
                    size={12}
                    color={index < stars ? 'black' : 'rgb(221,221,221)'}
                />
            ))}
        </div>
    )
}
export default ReviewSection
