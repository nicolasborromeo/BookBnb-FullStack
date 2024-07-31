import '../CreateSpotPage/CreateSpot.css'
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import * as spotActions from '../../store/spots'
import UpdateSpotForm from "./UpdateSpotForm"
// import Logo from "../Logo"


function UpdateSpotPage() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots.currentSpot ? state.spots.currentSpot : undefined)
    const spotImages = useSelector(state => state.spots.currentSpot ? state.spots.currentSpot.SpotImages : undefined)
    const previewImage = spotImages?.filter(img => img.preview)

    useEffect(()=> {
        dispatch(spotActions.fetchCurrentSpot(spotId))
    }, [dispatch, spotId])

    if (!spot) {
        return (<div className='loading-container'>
            <AiOutlineLoading className='loading-icon' />
        </div>)
    }

    return (
        <>
            <div className="background-div-image-container">
                <img src={`${previewImage[0].url}`} alt='slogan-hero-family-yard' />
            </div>
            <div className="create-spot-page-container">

                <div className="cs-branding-container">
                    <div className="create-spot-title-logo-container">
                        <h1>Update your spot</h1>
                    </div>
                    <p>Did you know?</p>
                    <p>Stays&apos; with detailed descriptions and high quality images get 40% more bookings than the rest</p>
                    <p>Faster responses get you better reviews</p>
                </div>

                <UpdateSpotForm spot={spot}/>

            </div>
        </>
    )
}

export default UpdateSpotPage
