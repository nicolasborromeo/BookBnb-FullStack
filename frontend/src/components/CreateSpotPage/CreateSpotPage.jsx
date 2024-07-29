import Logo from "../Logo"
import './CreateSpot.css'
import CreateSpotForm from "./CreateSpotForm"


function CreateSpotPage() {
    return (
        <>
            <div className="background-div-image-container">
                <img src="https://res.cloudinary.com/dklsvbe1v/image/upload/v1722208447/VRSloganHero_gnbkxs.webp" alt='slogan-hero-family-yard' />
            </div>
            <div className="create-spot-page-container">
                
                <div className="cs-branding-container">
                    <div className="create-spot-title-logo-container">
                        <h1>Live in your dream destination</h1>
                        <div className="cs-title-line-break">
                            <h1>with</h1>
                            <div className="logo-container" >
                                <Logo />
                            </div>
                        </div>
                    </div>
                    <p>Rent your property confidently</p>
                    <p>Earn for your future</p>
                    <p>You could earn $1,302 for 7 nights at an estimated $186 a night</p>
                </div>

                <CreateSpotForm />

            </div>
        </>
    )
}

export default CreateSpotPage
