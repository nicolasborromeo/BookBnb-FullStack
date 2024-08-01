import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import { TiStar } from "react-icons/ti";
import { AiOutlineLoading } from "react-icons/ai";
import OpenModalButton from '../OpenModalButton'
import DeleteSpotModal from '../DeleteSpotModal';
import CreateSpotButton from '../CreateSpotButton';
import './ManageSpots.css'

function ManageSpots() {
    const updateRef = useRef()
    const dispatch = useDispatch()
    const userSpots = useSelector(state => state.spots.userSpotsArray)
    const [isLoaded, setIsLoaded] = useState(true)

    useEffect(() => {
        dispatch(spotActions.fetchUserSpots()).then(() => {
            setIsLoaded(true)
        })
    }, [dispatch])

    if (isLoaded) return (
        <>
            <div className='manage-spots-header'>
                <h1 className='manage-spots-title'>Manage Your Spots</h1>
                <button className='manage-spot-create-button'>
                <CreateSpotButton />
                </button>
            </div>
            {userSpots &&
                <ul className="landing-page-container">
                    {userSpots?.map(spot => (
                        <li key={spot.id} style={{display: 'flex', flexDirection:'column', gap:'10px'}}className="lp-li-spot-container">
                            <NavLink key={spot.id} to={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <div className="lp-img-container">
                                    <img className='landing-page-spot-preview-img'
                                        src={`${spot.previewImage}`}
                                    />
                                </div>
                                <div className="lp-spot-info-container">
                                    <div className="lp-spot-location-and-rating-container">
                                        <span className="lp-spot-location">{spot.city}, {spot.state}</span>
                                        <span className="lp-rating-container">
                                            <TiStar className="lp-rating-star" />
                                            <span>{parseFloat(spot.avgRating).toFixed(1) || 'New'}</span>
                                        </span>
                                    </div>
                                </div>
                            </NavLink>
                            <div className="lp-spot-price" style={{fontSize: '0.9em', fontWeight: '200'}}>${spot.price} /night</div>
                            <div className='update-delete-buttons-container' ref={updateRef}>
                                <NavLink to={`/user/manage-spots/${spot.id}`} className='manage-spot-update-button'>Update</NavLink>
                                <OpenModalButton
                                    buttonText={'Delete'}
                                    modalComponent={<DeleteSpotModal spotId={spot.id} />}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            }
            {!userSpots?.length &&
                <div className='manage-spots-create-spot-container'>
                    <h3>You don&apos;t have any spots yet</h3>
                    <NavLink to='/list' className='create-spot-navlink managespot-create-button'><button className="create-new-spot-button">Create a New Spot</button></NavLink>
                </div>
            }
        </>
    )
    else return (
        <div className='loading-container'>
            <AiOutlineLoading className='loading-icon' />
        </div>
    )
}

export default ManageSpots
