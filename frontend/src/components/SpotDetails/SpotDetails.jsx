import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import './SpotDetails.css'
import { csrfFetch } from "../../store/csrf"

function SpotDetails() {
    const { spotId } = useParams()
    const [spot, setSpot] = useState()
    const [previewImg, setPreviewImg] = useState('')
    const [spotImages, setSpotImages] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const response = await csrfFetch(`/api/spots/${spotId}`)
            const data = await response.json()
            setSpot(data)
            setPreviewImg(data.SpotImages.find((img => img.preview === true)))
            setSpotImages(data.SpotImages.filter(img => img.preview === false))
        }
        fetch()
    }, [spotId])

    console.log(spot)

    if (spot) {
        return (
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
                <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
                <p>{spot.description}</p>
                <p>Hosted by: {spot.Owner.firstName} {spot.Owner.lastName}</p>
            </div>
        )
    }

}

export default SpotDetails
