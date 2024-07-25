import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from 'react'
import * as spotActions from '../../store/spots';
import './LandingPage.css'

function LandingPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const spots = useSelector(state => state.spots.allSpots);
    console.log('allspots', spots)

    useEffect(() => {
        dispatch(spotActions.fetchSpots()).then(() => {
            setIsLoaded(true)
        })
    }, [dispatch])

    if(isLoaded) return (
        <div >
            <ul className="landing-page-container">
                {spots?.map(spot => (
                    <li key={spot.id} className="lp-li-spot-container">
                        <div className="lp-img-container">
                            <img className='landing-page-spot-preview-img'
                                src={`${spot.previewImage}`}
                            />
                        </div>
                        <div className="tooltip-container">
                            <span className="tooltip-text">{spot.name}</span>
                        </div>
                        <p className="">{spot.city}, {spot.state}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default LandingPage
