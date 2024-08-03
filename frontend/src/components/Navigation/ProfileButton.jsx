import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from '../SignUpFormModal'
import OpenModalButton from "../OpenModalButton"
import { useNavigate } from "react-router-dom";

export default function ProfileButton( ) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const ulRef = useRef()
    const sessionUser = useSelector(state => state.session.user);
    const [showDropdown, setShowDropdown] = useState(false)

    const logout = (e) => {
        e.preventDefault()
        navigate('/')
        dispatch(sessionActions.logout())

    };

    const toggleDropdown = (e) => {
        e.stopPropagation()
        setShowDropdown(prev => !prev)
    }

    useEffect(() => {
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) setShowDropdown(false)
        }
        if (showDropdown) document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showDropdown])


    const sessionLinks = sessionUser ? (
        <>
            <div className="dropdown-text">
                Hello, {sessionUser.firstName} {sessionUser.lastName}
                <br/>
                <br/>
                {sessionUser.email}
            </div>

            <li className="profile-dropdown-session-actions" onClick={()=> navigate('/user/manage-spots')}>Manage stays </li>
            <li className="profile-dropdown-session-actions" onClick={logout}> Log out </li>
        </>

    ) : (
        <>
            <li className="profile-dropdown-login-logout"
                // onClick={(e)=> toggleDropdown}
            >
                <OpenModalButton
                    style={{fontWeight: '600'}}
                    className='profile-dropdown-buttons'
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                />
            </li>
            <li className="profile-dropdown-login-logout">
                <OpenModalButton
                    className='profile-dropdown-buttons'
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
            </li>
        </>
    );


    return (
        <>
            <div className="navigation-user-button" onClick={toggleDropdown}>
                <IoMenu
                    style={{color: 'black', width: '20px'}}
                    onClick={toggleDropdown} />
                <FaUserCircle  />
            </div>
            {showDropdown &&
            <ul className='profile-dropdown' ref={ulRef}>
                {sessionLinks}
            </ul>}
        </>
    );
}
