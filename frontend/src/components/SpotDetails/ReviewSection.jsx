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
import { IoClose } from "react-icons/io5";
import { useModal } from '../../context/Modal'

const ReviewSection = ({user }) => {
    const spot = useSelector(state => state.spots.currentSpot)
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
        if(user) spot.ownerId === user?.id ?  setIsOwner(true) :  setIsOwner(false)
    }, [spot, user])

    return (
        <>
            <div className="sd-reviews-header">
                <div className="review-summary-header">
                    <ReviewSummaryInfo />
                    {(user?.id === spot.Owner.id && !Reviews.length) && <h3 className='review-section-empty-reviews-message'>Your stay doesn&apos;t have any reviews yet</h3>}
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
            <ReviewsPreview  spot={spot}/>

            {/* <ReviewsList spot={spot} /> */}
        </>
    )
}

const ReviewsPreview = ({spot}) => {
    const Reviews = useSelector(state => state.spots.spotReviewsArray)
    const user = useSelector(state => state.session.user)
    let sortedReviews = Reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    let fourReviews = sortedReviews.slice(0,4)

    if (Reviews) return (
        <div className="sd-reviews-container">
            <ul className="sd-review-list">
                {
                    Reviews.length >= 1
                    &&
                    (
                        fourReviews.map(review => {
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
                                                            actionIdentifier={(review.id)}

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
                Reviews.length > 4
                &&
                <OpenModalButton
                    style={{border:'1px solid black', backgroundColor:'transparent', color: 'black', padding:'13px 23px', fontSize:'16px', borderRadius:'8px', cursor:'pointer', marginTop:'10px'}}
                    buttonText={`Show all ${Reviews.length} reviews`}
                    modalComponent={<ReviewsList />}
                />
            }
            {
                (user && !Reviews.length && spot.Owner.id !== user?.id
                ) && (
                    <h3 className='review-section-empty-reviews-message'>
                        Be the first to post a review!
                    </h3>
                )
            }

        </div>
    )
}

const ReviewsList = ({ spot }) => {
    const { setModalContent } = useModal()
    const Reviews = useSelector(state => state.spots.spotReviewsArray)
    const user = useSelector(state => state.session.user)
    let sortedReviews = Reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (Reviews) return (
        <div className="sd-reviews-modal-container">
            <span className='confirm-delete-x' onClick={() => setModalContent(null)}><IoClose size={20} color='gray'/></span>
            <h2 style={{fontWeight: '500'}}><ReviewSummaryInfo /> </h2>
            <ul className="sd-review-modal-list">
                {
                    Reviews.length >= 1
                    &&
                    (
                        sortedReviews.map(review => {
                            return (
                                <>
                                    <li key={review.id} className="sd-individual-review-modal">

                                        <div className="review-user-logo-name-container">
                                            <FaRegUser className='review-user-logo-icon' size={25} />
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
                                                            actionIdentifier={(review.id)}
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
                (user && !Reviews.length && spot.Owner.id !== user?.id
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
