import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from 'react'
import * as spotActions from '../../store/spots';
import './LandingPage.css'
import { TiStar } from "react-icons/ti";
import { NavLink } from "react-router-dom";


function LandingPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const spots = useSelector(state => state.spots.spotsArray);
    console.log('allspots', spots)

    useEffect(() => {
        dispatch(spotActions.fetchSpots()).then(() => {
            setIsLoaded(true)
        })
    }, [dispatch])


    if (isLoaded) return (
        <div >
            <ul className="landing-page-container">
                {spots?.map(spot => (
                    <li key={spot.id} className="lp-li-spot-container">
                        <NavLink key={spot.id} to={`spots/${spot.id}`} style={{ textDecoration: 'none', color:'black' }}>
                            <div className="lp-img-container">
                                <img className='landing-page-spot-preview-img'
                                    src={`${spot.previewImage}`}
                                />
                            </div>
                            <div className="tooltip-container">
                                <span className="tooltip-text">{spot.name}</span>
                            </div>
                            <div className="lp-spot-info-container">
                                <div className="lp-spot-location-and-rating-container">
                                    <span className="lp-spot-location">{spot.city}, {spot.state}</span>
                                    <span className="lp-rating-container">
                                        <TiStar className="lp-rating-star" />
                                        <span>{spot.avgRating || 'New'}</span>
                                    </span>
                                </div>
                                <div className="lp-spot-price">${spot.price} /night</div>
                            </div>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default LandingPage
