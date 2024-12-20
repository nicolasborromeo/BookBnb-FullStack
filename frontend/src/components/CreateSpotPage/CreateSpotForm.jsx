// import { testSpot, testSpot2, testImgs, testImgs2 } from "./dummydata";
// import { validateImages } from "./createSpotValidation";

import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import validator from "validator";
import { csrfFetch } from "../../store/csrf";

function CreateSpotForm() {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate();
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [step, setStep] = useState(1)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [images, setImages] = useState({})
    const [errors, setErrors] = useState({})
    const [disabledPrev, setDisabledPrev] = useState(true)

    // const [disabledNext, setDisabledNext] = useState(false)
    // const [disabledCreate, setDisabledCreate] = useState(true)
    // useEffect(() => {
    //     if (step === 1) setDisabledNext(country && address && city && state ? false : true)
    //     if (step === 2) setDisabledNext(description.length >= 30 ? false : true)
    //     if (step === 3) setDisabledNext(name ? false : true)
    //     if (step === 4) setDisabledNext(Number(price) > 0 ? false : true)
    //     if (step === 5) setDisabledCreate(validateImages(images))
    // }, [images, price, name, description, country, address, city, state, step, disabledNext, disabledCreate])

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

        const imgArray = Object.values(images)
        imgArray.forEach(img => {
            if (!validator.isURL(img)) {
                window.alert('Invalid image url')
                throw Error('invalid image url')
            }
        })

        const fetch = async () => {
            try {
                const res = await csrfFetch('/api/spots', {
                    method: 'POST',
                    body: JSON.stringify(newSpot),
                    // body: JSON.stringify(testSpot2)
                });

                if (!res.ok) throw res;
                const data = await res.json();
                const spotId = data.id;

                for (const img in images) {
                    let isPreview = img == 1 ? true : false;
                    const body = {
                        url: images[img],
                        preview: isPreview,
                    };
                    const imgResponse = await csrfFetch(`/api/spots/${spotId}/images`, {
                        method: 'POST',
                        body: JSON.stringify(body),
                    });
                    if (!imgResponse.ok) {
                        const imgError = await imgResponse.json();
                        throw Error(imgError);
                    }
                }

                console.log('Spot created successfully:', data);
                navigate(`/spots/${data.id}`, { replace: true });

            } catch (error) {
                switch (error.status) {
                    case 401: window.alert('You must be logged in to create a Spot');
                        break;
                    case 400: window.alert('Invalid Spot Information, please make sure you complete all the reuired fields')
                        break;
                    default: setErrors({ error: 'Sorry, there was an error creating the Spot' });
                }

            }

        }
        fetch()
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
    return (
        <div className="form-side-container">
            <div className="form-container">
                <form className="create-spot-form" onSubmit={(e) => e.preventDefault()}>
                    <h3 className="cs-form-header">Create a New Spot</h3>
                    {step === 1 &&

                        <section className='cs-section'>
                            <h3 className="cs-step-title">Where&apos;s your place located?</h3>
                            <h6 className="cs-step-sub-title">Guests will only get your exact address once they booked a reservation.</h6>
                            <div className="cs-inputs-container">
                                <input required onChange={(e) => setCountry(stringUppercaser(e.target.value))} type='text' className="cs-inputs" placeholder='Country' value={country} />
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
                                {errors?.description && <p className="error-msg description-error">{errors.description}</p>}
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
                                <h6 className="cs-step-sub-title"
                                // style={{ textDecoration: disabledCreate ? 'underline' : '' }}
                                >
                                    Submit a link to at least one photo to publish your spot
                                </h6>
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
                                    onClick={validateInputs}
                                    className='profile-dropdown-final-form-button'

                                >Create Spot</button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        window.alert('you must be logged in to create a spor')
                                        e.preventDefault()
                                    }}
                                    style={{ border: "none", backgroundColor: 'transparent' }}
                                >
                                    <OpenModalButton
                                        style={{border:'0', backgroundColor:'rgb(217,9,101)', color:'white', fontSize:'16px', padding:'10px 20px', borderRadius:'8px' }}
                                        buttonText="Create Spot"
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

export default CreateSpotForm


const stringUppercaser = (word) => {
    if (word) {
        let stringWord = word.toString().toLowerCase()
        let firstLetter = stringWord[0]
        let rest = stringWord.slice(1)
        return firstLetter.toUpperCase() + rest
    } else return ''
}

// const stringParser = (string) => {
//     let parsedSentence = []
//     if (string.includes(' ')) {
//         let stringArr = string.split(' ')
//             let mappedString = stringArr.map(word => stringUppercaser(word))
//             parsedSentence.push(mappedString)
//     } else {
//             return stringUppercaser(string[0])
//     }

// }
