import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import * as spotActions from '../../store/spots'
import { testSpot, testImgs } from "./dummydata";
import { useNavigate } from "react-router-dom";

function CreateSpotForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [step, setStep] = useState(1)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [images, setImages] = useState({})
    const [errors, setErrors] = useState([])
    const [disabledNext, setDisabledNext] = useState(true)
    const [disabledPrev, setDisabledPrev] = useState(true)

    useEffect(() => {
        setDisabledNext(step === 5 ? true : false)
    }, [step, disabledNext])
    useEffect(() => {
        setDisabledPrev(step === 1 ? true : false)
    }, [step, disabledNext])

    const handleImages = (e) => {
        let imgId = e.target.id
        let newImgState = { ...images }
        newImgState[imgId] = { url: e.target.value }
        return setImages(newImgState)
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let newSpot = { address, city, state, country, name, description, price };
        newSpot.lat = 0;
        newSpot.lng = 0;

        try {
          const data = await dispatch(spotActions.postNewSpot(testSpot, testImgs));
          console.log('Spot created successfully:', data);
          navigate(`/spots/${data.id}`, { replace: true });
        } catch (err) {
          if (err.json) {
            const errorResponse = await err.json();
            console.error('Error:', errorResponse.errors);
            let errVals = Object.values(errorResponse.errors);
            setErrors([...errVals]);
          } else {
            console.error('Error:', err);
          }
        }
      };


    return (
        <div className="form-side-container">
                {errors &&
                    <ul className="cs-errors">{
                        errors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>}
            <div className="form-container">
                <form className="create-spot-form" onSubmit={handleFormSubmit}>
                    <h3 className="cs-form-header">Create a New Spot</h3>
                    {step === 1 &&

                        <section className='cs-section'>
                            <h3 className="cs-step-title">Where&apos;s your place located?</h3>
                            <h6 className="cs-step-sub-title">Guests will only get your exact address once they booked a reservation.</h6>
                            <div className="cs-inputs-container">
                                <input onChange={(e) => setCountry(e.target.value)} type='text' className="cs-inputs" placeholder='Country' value={country} />
                                <input onChange={(e) => setAddress(e.target.value)} type='text' className="cs-inputs" placeholder='Street Addres' value={address} />
                                <input onChange={(e) => setCity(e.target.value)} type='text' className="cs-inputs" placeholder='City' value={city} />
                                <input onChange={(e) => setState(e.target.value)} type='text' className="cs-inputs" placeholder='State' value={state} />
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
                                <textarea onChange={(e) => setDescription(e.target.value)} className="cs-section2-textarea" placeholder="Please write at least 30 characters" value={description}></textarea>
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
                                <h6 className="cs-step-sub-title">Submit a link to at least one photo to publish your spot.</h6>
                                <div className="cs-inputs-container">
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='1' type="text" placeholder="Preview Image URL" />
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='2' type="text" placeholder="Image URL" />
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='3' type="text" placeholder="Image URL" />
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='4' type="text" placeholder="Image URL" />
                                    <input onChange={(e) => handleImages(e)} className="cs-url-input" id='5' type="text" placeholder="Image URL" />
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
                            <button type="submit">Create Spot</button>
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
