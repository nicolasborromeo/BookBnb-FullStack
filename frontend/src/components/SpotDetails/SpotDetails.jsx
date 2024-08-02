import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import './SpotDetails.css'
import { useSelector, useDispatch } from "react-redux";
import ReviewSection from "./ReviewSection";
import ReviewSummaryInfo from "./ReviewSummaryInfo";
import * as spotActions from '../../store/spots'

function SpotDetails() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const { spotId } = useParams()
    const [spot, setSpot] = useState()
    const [previewImg, setPreviewImg] = useState('')
    const [spotImages, setSpotImages] = useState([])
    const [numGuests, setNumGuests] = useState(1)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        dispatch(spotActions.fetchCurrentSpot(spotId))
        .then((res) => {
            setSpot(res)
            setPreviewImg(res.SpotImages.find((img => img.preview === true)))
            setSpotImages(res.SpotImages.filter(img => img.preview === false))
        })
    }, [dispatch, spotId])

    useEffect(() => {
        numGuests > 1 ? setDisabled(false) : setDisabled(true)
    }, [numGuests])


    if (spot) {
        return (
            <>
                <div className="spot-details-container">
                    <p className="sd-spot-name">{spot.name} </p>
                    <div className="sd-image-container">
                        <div className="sd-preview-img-container">
                            <img src={`${previewImg.url}`} />
                        </div>
                        <div className="sd-small-images-container">
                            {spotImages.map(img => (
                                <div key={img.id} className="sd-spot-images-container">
                                    <img className='sd-spot-image' key={img.id} src={img.url} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sd-info-callout-section-container">
                        <div className="sd-info-container">
                            <p style={{ fontWeight: '500', fontSize: '1.3em', marginTop: '0' }}>{spot.description}</p>
                            <p style={{ fontWeight: '100' }}>Location: {spot.city}, {spot.state}, {spot.country}</p>
                            <p style={{ fontWeight: '100' }}>Hosted by: {spot.Owner.firstName} {spot.Owner.lastName}</p>
                        </div>
                        <div className="sd-callout-box-container">
                            <div className="sd-callout">
                                <div className="callout-price-reviewinfo-container">
                                    <div className="callout-price-container">
                                        <p className="sd-callout-price">${spot.price}/night</p>
                                        <p className="callout-text-total-before-taxes">Total before taxes</p>
                                    </div>
                                    <div className="sd-callout-review-summary-info">
                                        <ReviewSummaryInfo spot={spot} />
                                    </div>
                                </div>
                                <form className="sd-callout-reservation-form">
                                    <div className="sd-callout-check-in-out-container">
                                        <button className="sd-callout-check-in" onClick={(e) => e.preventDefault()}>
                                            {/* onclick open modal with dates */}
                                            <p>CHECK-IN</p>
                                            <p className="sd-callout-dates">08/06/2024</p>
                                            {/* the date should be the value selected from the popup. controlled value */}

                                        </button>
                                        <button className="sd-callout-check-out" onClick={(e) => e.preventDefault()}>
                                            {/* onclick open modal with dates */}
                                            <p>CHECKOUT</p>
                                            <p className="sd-callout-dates">08/15/2024</p>
                                            {/* the date should be the value selected from the popup. controlled value */}
                                        </button>
                                        <div className="sd-callout-number-guests">
                                            <p>GUESTS</p>
                                            <div className="minus-plus-guests-buttons-container">

                                                <button
                                                    disabled={disabled}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        return setNumGuests(prev => prev - 1)
                                                    }}>-</button>

                                                <p>{numGuests}</p>

                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        return setNumGuests(prev => prev + 1)
                                                    }}>+</button>
                                            </div>
                                        </div >
                                    </div>
                                    <button
                                        type='submit'
                                        className="sd-callout-reserve-button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            window.alert("Feature coming soon")
                                        }}

                                    >Reserve</button>
                                    <p className="callout-text">You won&apos;t be charged yet</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sd-reviews-section-container">
                    <ReviewSection spot={spot} user={user} />

                </div>
            </>
        )
    }

}



export default SpotDetails
