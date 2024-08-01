import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import validator from "validator";
import * as spotActions from '../../store/spots'
import { AiOutlineLoading } from "react-icons/ai";
import { formatImages } from "./helperFunctions";


function UpdateSpotForm({ spot }) {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user)
    const [step, setStep] = useState(1)
    const [city, setCity] = useState(spot.city)
    const [name, setName] = useState(spot.name)
    const [state, setState] = useState(spot.state)
    const [price, setPrice] = useState(spot.price)
    const [images, setImages] = useState({})
    const [country, setCountry] = useState(spot.country)
    const [address, setAddress] = useState(spot.address)
    const [description, setDescription] = useState(spot.description)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [disabledPrev, setDisabledPrev] = useState(true)

    useEffect(() => {
        dispatch(spotActions.fetchCurrentSpot(spotId)).then((res) => {
            // if(res.status === 404) {navigate('/page-not-found')}
            setCountry(res.country)
            setAddress(res.address)
            setCity(res.city)
            setState(res.state)
            setDescription(res.description)
            setName(res.name)
            setPrice(res.price)
            const images = formatImages(res.SpotImages)
            setImages(images)

        }).then(() => setIsLoading(false)).catch((err) => console.log('error', err))
    }, [dispatch, spotId])

    useEffect(() => {
        setDisabledPrev(step === 1 ? true : false)
    }, [step])

    const handleImages = (e) => {
        let imgId = e.target.id
        let newImgState = { ...images }
        newImgState[imgId] = e.target.value
        if (newImgState[imgId] === '') delete newImgState[imgId]
        return setImages(newImgState)
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const newSpot = { address, city, state, country, name, description, price };
        newSpot.lat = 0;
        newSpot.lng = 0;

        // const imgArray = Object.values(images)
        // imgArray.forEach(img => {
        //     if (!validator.isURL(img)) {
        //         window.alert('Invalid image url')
        //         throw Error('invalid image url')
        //     }
        // })

        dispatch(spotActions.updateSpot(newSpot, spotId))
            // .then(()=> dispatch(spotActions.updateSpotImages(images))) //UPDATE IMAGES?
            .then(() => {
                console.log('succesfully updated spot')
                navigate(`/spots/${spotId}`)
            })
            .catch((err)=> {
                console.log('theres beeen an error:',err)
            })


    };


    const validateInputs = (e) => {
        switch (step) {
            case 1:
                setErrors({})
                if (!country) setErrors((prev) => ({ ...prev, country: 'Country is required' }))
                if (!address) setErrors((prev) => ({ ...prev, address: 'Address is required' }))
                if (!city) setErrors((prev) => ({ ...prev, city: 'City is required' }))
                if (!state) setErrors((prev) => ({ ...prev, state: 'State is required' }))
                if (country && address && city && state) setStep(2)
                break;
            case 2:
                setErrors({})
                if (description.length < 30) setErrors((prev) => ({ ...prev, description: 'Description must be at least 30 characters' }))
                else setStep(3)
                break
            case 3:
                setErrors({})
                if (!name) setErrors((prev) => ({ ...prev, name: 'A name is required' }))
                else setStep(4)
                break
            case 4:
                setErrors({})
                if (!price || Number(price) < 1) setErrors((prev) => ({ ...prev, price: 'Price must be grater than 1' }))
                else setStep(5)
                break
            case 5: {
                setErrors({})
                let imgKeys = Object.keys(images)
                if (!imgKeys.length || !validator.isURL(images['1'])) return setErrors((prev) => ({ ...prev, prevImg: 'A preview url img is required' }))
                if (images['2']) validator.isURL(images['2']) ? null : setErrors((prev) => ({ ...prev, img2: 'Invalid Url' }))
                if (images['3']) validator.isURL(images['3']) ? null : setErrors((prev) => ({ ...prev, img3: 'Invalid Url' }))
                if (images['4']) validator.isURL(images['4']) ? null : setErrors((prev) => ({ ...prev, img4: 'Invalid Url' }))
                if (images['5']) validator.isURL(images['5']) ? null : setErrors((prev) => ({ ...prev, img5: 'Invalid Url' }))
                const pass = Object.keys(errors).length === 0
                if (pass) handleFormSubmit(e)
                break
            }
            default:
                break;
        }
    }
    if (isLoading) return (
        <div className='loading-container' style={{ position: 'absolute' }}>
            <AiOutlineLoading className='loading-icon' />
        </div>
    )
    else if (!isLoading) return (
        <div className="form-side-container">
            <div className="form-container">
                <form className="create-spot-form" onSubmit={(e) => e.preventDefault()}>
                    <h3 className="cs-form-header">Update your Spot</h3>
                    {step === 1 &&

                        <section className='cs-section'>
                            <h3 className="cs-step-title">Where&apos;s your place located?</h3>
                            <h6 className="cs-step-sub-title">Guests will only get your exact address once they booked a reservation.</h6>
                            <div className="cs-inputs-container">
                                <input required onChange={(e) => setCountry(e.target.value)} type='text' className="cs-inputs" placeholder='Country' value={country} />
                                {errors?.country && <p className="error-msg">{errors.country}</p>}
                                <input required onChange={(e) => setAddress(e.target.value)} type='text' className="cs-inputs" placeholder='Street Addres' value={address} />
                                {errors?.address && <p className="error-msg">{errors.address}</p>}
                                <input required onChange={(e) => setCity(e.target.value)} type='text' className="cs-inputs" placeholder='City' value={city} />
                                {errors?.city && <p className="error-msg">{errors.city}</p>}
                                <input required onChange={(e) => setState(e.target.value)} type='text' className="cs-inputs" placeholder='State' value={state} />
                                {errors?.state && <p className="error-msg">{errors.state}</p>}

                            </div>
                        </section>
                    }

                    {step === 2 &&
                        <section className='cs-section'>
                            <h3 className="cs-step-title">Describe your place to guests</h3>
                            <h6 className="cs-step-sub-title">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h6>
                            <div className="cs-inputs-container">
                                <textarea onChange={(e) => setDescription(e.target.value)} className="cs-section2-textarea" placeholder="Please write at least 30 characters..." value={description}></textarea>
                                {errors?.description && <p className="error-msg">{errors.description}</p>}
                            </div>
                        </section>
                    }

                    {step === 3 &&
                        <section className='cs-section'>
                            <h3 className="cs-step-title">Create a title for your spot</h3>
                            <h6 className="cs-step-sub-title">Catch guests&apos; attention with a spot title that highlights what makes your place special.</h6>
                            <div className="cs-inputs-container">
                                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name of your spot" value={name} />
                                {errors?.name && <p className="error-msg">{errors.name}</p>}
                            </div>
                        </section>
                    }

                    {step === 4 &&
                        <section className='cs-section'>
                            <h3 className="cs-step-title">Set a base price for your spot</h3>
                            <h6 className="cs-step-sub-title">Competitive pricing can help your listing stand out and rank higher in search results.</h6>
                            <div className="cs-inputs-container">
                                <input onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price per night (USD)" value={price} />
                                {errors?.price && <p className="error-msg">{errors.price}</p>}
                            </div>
                        </section>
                    }

                    {step === 5 &&
                        <>
                            <section className='cs-section'>
                                <h3 className="cs-step-title">Liven up your spot with photos</h3>
                                <h6 className="cs-step-sub-title">Submit a link to at least one photo to publish your spot</h6>
                                <div className="cs-inputs-container">
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='1' type="text" placeholder="Preview Image URL" value={images['1']} />
                                    {errors?.prevImg && <p className="error-msg">{errors.prevImg}</p>}
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='2' type="text" placeholder="Image URL" value={images['2']} />
                                    {errors?.img2 && <p className="error-msg">{errors.img2}</p>}
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='3' type="text" placeholder="Image URL" value={images['3']} />
                                    {errors?.img3 && <p className="error-msg">{errors.img3}</p>}
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='4' type="text" placeholder="Image URL" value={images['4']} />
                                    {errors?.img4 && <p className="error-msg">{errors.img4}</p>}
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='5' type="text" placeholder="Image URL" value={images['5']} />
                                    {errors?.img5 && <p className="error-msg">{errors.img5}</p>}
                                </div>
                            </section>

                        </>
                    }


                    <div className="cs-form-buttons-div">
                        <button className="cs-prev-button"
                            disabled={disabledPrev}
                            onClick={(e) => {
                                e.preventDefault()
                                setStep(prev => prev - 1)
                            }}
                        >Prev</button>
                        {step === 5 ? (
                            user ? (
                                <button type="submit"
                                    // disabled={disabledCreate}
                                    onClick={(e) => validateInputs(e)}
                                >Update Spot</button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        window.alert('you must be logged in to create a spor')
                                        e.preventDefault()
                                    }}
                                    style={{ border: "none", backgroundColor: 'transparent' }}
                                >
                                    <OpenModalButton
                                        className='profile-dropdown-buttons'
                                        buttonText="Update Spot"
                                        modalComponent={<LoginFormModal />}
                                    />
                                </button>
                            )
                        ) : (

                            <button className="cs-next-button"
                                // disabled={disabledNext}
                                onClick={(e) => {
                                    e.preventDefault()
                                    validateInputs(e)
                                }}
                            >Next</button>
                        )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateSpotForm
