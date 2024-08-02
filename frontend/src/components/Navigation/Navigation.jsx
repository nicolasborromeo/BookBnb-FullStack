import { NavLink } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import CreateSpotButton from "../CreateSpotButton";

import './Navigation.css'

export default function Navigation({ isLoaded }) {

    return (
        <div className="navigation-container">
            <ul className="navigation-ul">
                <li className="logos-container">
                    <NavLink to='/'><img className='navigation-logo' src="/Logo.png" /></NavLink>
                    <NavLink to='/'><img className='navigation-brand' src="/brand.png" /></NavLink>
                </li>
                <li className="user-menu-container">
                    <CreateSpotButton />
                    {isLoaded && <ProfileButton />}
                </li>
            </ul>
        </div>
    );
}
