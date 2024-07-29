import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import * as spotActions from '../../store/spots'
// import { testSpot, testImgs } from "./dummydata";
import { useNavigate } from "react-router-dom";
import { validateImages } from "./createSpotValidation";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

function CreateSpotForm() {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [step, setStep] = useState(5)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [images, setImages] = useState({})
    const [errors, setErrors] = useState([])
    const [disabledNext, setDisabledNext] = useState(true)
    const [disabledPrev, setDisabledPrev] = useState(true)
    const [disabledCreate, setDisabledCreate] = useState(true)

    useEffect(() => {
        if (step === 1) setDisabledNext(country && address && city && state ? false : true)
        if (step === 2) setDisabledNext(description.length >= 30 ? false : true)
        if (step === 3) setDisabledNext(name ? false : true)
        if (step === 4) setDisabledNext(Number(price) > 0 ? false : true)
        if (step === 5) setDisabledCreate(validateImages(images))
    }, [images, price, name, description, country, address, city, state, step, disabledNext, disabledCreate])

    useEffect(() => {
        setDisabledPrev(step === 1 ? true : false)
    }, [step, disabledNext])

    const handleImages = (e) => {
        let imgId = e.target.id
        let newImgState = { ...images }
        newImgState[imgId] = e.target.value
        return setImages(newImgState)
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let newSpot = { address, city, state, country, name, description, price };
        newSpot.lat = 0;
        newSpot.lng = 0;

        return dispatch(spotActions.postNewSpot(newSpot, images))
            .catch(
                async (res) => {
                    console.log('res', res)
                    if (!res.ok) {
                        let err = await res.json()
                        switch (res.status) {
                            case 401: window.alert('You must be logged in to create a Spot');
                                break;
                            case 400: {
                                let errVals = Object.values(err.errors);
                                setErrors([...errVals]);
                            }
                                break;
                            default: setErrors(['Sorry, there was an error creating the Spot']);
                        }
                    } else {
                        const data = await res.json()
                        console.log('Spot created successfully:', data);
                        navigate(`/spots/${data.id}`, { replace: true });
                    }
                }
            )
    };
    console.log(errors)

    return (
        <div className="form-side-container">
            <div className="form-container">
                {errors &&
                    <ul className="cs-errors" style={errors.length ? { display: 'flex' } : { display: 'none' }}>{
                        errors.map((err, i) => (
                            <li key={i}> - {err}</li>
                        ))}
                    </ul>}
                <form className="create-spot-form" onSubmit={handleFormSubmit}>
                    <h3 className="cs-form-header">Create a New Spot</h3>
                    {step === 1 &&

                        <section className='cs-section'>
                            <h3 className="cs-step-title">Where&apos;s your place located?</h3>
                            <h6 className="cs-step-sub-title">Guests will only get your exact address once they booked a reservation.</h6>
                            <div className="cs-inputs-container">
                                <input required onChange={(e) => setCountry(e.target.value)} type='text' className="cs-inputs" placeholder='Country' value={country} />
                                <input required onChange={(e) => setAddress(e.target.value)} type='text' className="cs-inputs" placeholder='Street Addres' value={address} />
                                <input required onChange={(e) => setCity(e.target.value)} type='text' className="cs-inputs" placeholder='City' value={city} />
                                <input required onChange={(e) => setState(e.target.value)} type='text' className="cs-inputs" placeholder='State' value={state} />
                                {/* <input type='text' className="cs-inputs" placeholder='Latitude' value={latitude}></input>
                        <input type='text' className="cs-inputs" placeholder='Longitud' value={longitud}></input> */}
                            </div>
                        </section>
                    }

                    {step === 2 &&
                        <section className='cs-section'>
                            <h3 className="cs-step-title">Describe your place to guests</h3>
                            <h6 className="cs-step-sub-title">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h6>
                            <div className="cs-inputs-container">
                                <textarea onChange={(e) => setDescription(e.target.value)} className="cs-section2-textarea" placeholder="Please write at least 30 characters..." value={description}></textarea>
                            </div>
                        </section>
                    }

                    {step === 3 &&
                        <section className='cs-section'>
                            <h3 className="cs-step-title">Create a title for your spot</h3>
                            <h6 className="cs-step-sub-title">Catch guests&apos; attention with a spot title that highlights what makes your place special.</h6>
                            <div className="cs-inputs-container">
                                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name of your spot" value={name} />
                            </div>
                        </section>
                    }

                    {step === 4 &&
                        <section className='cs-section'>
                            <h3 className="cs-step-title">Set a base price for your spot</h3>
                            <h6 className="cs-step-sub-title">Competitive pricing can help your listing stand out and rank higher in search results.</h6>
                            <div className="cs-inputs-container">
                                <input onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price per night (USD)" value={price} />
                            </div>
                        </section>
                    }

                    {step === 5 &&
                        <>
                            <section className='cs-section'>
                                <h3 className="cs-step-title">Liven up your spot with photos</h3>
                                <h6 className="cs-step-sub-title" style={{ textDecoration: disabledCreate ? 'underline' : '' }}>Submit a link to at least one photo to publish your spot.</h6>
                                <div className="cs-inputs-container">
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='1' type="text" placeholder="Preview Image URL" value={images['1']} />
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='2' type="text" placeholder="Image URL" value={images['2']} />
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='3' type="text" placeholder="Image URL" value={images['3']} />
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='4' type="text" placeholder="Image URL" value={images['4']} />
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='5' type="text" placeholder="Image URL" value={images['5']} />
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
                                    disabled={disabledCreate}
                                >Create Spot</button>
                            ) : (
                                <OpenModalButton
                                    className='profile-dropdown-buttons'
                                    buttonText="Create Spot"
                                    modalComponent={<LoginFormModal />}
                                />
                            )
                        ) : (

                            <button className="cs-next-button"
                                disabled={disabledNext}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setStep(prev => prev + 1)
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

export default CreateSpotForm
