import { TiStar } from "react-icons/ti";
import { useSelector } from "react-redux";
import { reviewInfoFormatter } from "./helperFunctions";


const ReviewSummaryInfo = () => {
    const spot = useSelector(state=> state.spots.currentSpot)
    const spotReviews = useSelector(state=> state.spots.spotReviewsArray)
    console.log('spotreviews', spotReviews)
    return (
        <div className="summary-info-container">
            <TiStar className="lp-rating-star" />
            <span>{spotReviews.length ? parseFloat(spot.avgRating).toFixed(1) : 'New'}</span>
            {spotReviews.length >= 1 && <span>·</span>}
            <span className="sd-callout-num-reviews">{spotReviews.length ? reviewInfoFormatter(spot) : ''}</span>
        </div>

    )
}


export default ReviewSummaryInfo
