import { NavLink } from "react-router-dom"
import './CreateSpotButton.css'

function CreateSpotButton() {
    return <NavLink to='/list' style={{maxWidth: 'max-content'}} className='create-spot-navlink'><button className="create-new-spot-button">Create a New Spot</button></NavLink>
}

export default CreateSpotButton
