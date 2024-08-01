import { TiStar } from "react-icons/ti";
import { useSelector } from "react-redux";

const ReviewSummaryInfo = ({ reviewInfoFormatter }) => {
    const spot = useSelector(state=> state.spots.currentSpot)
    return (
        <>
            <TiStar className="lp-rating-star" />
            <span>{spot.avgRating ? parseFloat(spot.avgRating).toFixed(1) : 'New'}</span>
            {spot.numReviews >= 1 && <span>·</span>}
            <span className="sd-callout-num-reviews">{spot.numReviews ? reviewInfoFormatter() : ''}</span>
        </>

    )
}


export default ReviewSummaryInfo
