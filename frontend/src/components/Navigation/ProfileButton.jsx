import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from '../SignUpFormModal'
import OpenModalButton from "../OpenModalButton"

export default function ProfileButton( ) {
    const dispatch = useDispatch();
    const ulRef = useRef()
    const sessionUser = useSelector(state => state.session.user);
    const [showDropdown, setShowDropdown] = useState(false)

    const logout = (e) => {
        e.preventDefault()
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
            <li>Hello, {sessionUser.firstName} {sessionUser.lastName}</li>
            {/* <li>{sessionUser.username}</li>
            <li>{sessionUser.lastName}</li> */}
            <li>{sessionUser.email}</li>
            <li><NavLink onClick={logout}>Log Out</NavLink></li>
        </>

    ) : (
        <>
            <li>
                <OpenModalButton
                    className='profile-dropdown-buttons'
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                />
            </li>
            <li>
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
            <div className="navigation-user-button">
                <IoMenu
                    style={{color: 'black', width: '20px'}}
                    onClick={toggleDropdown} />
                <FaUserCircle onClick={toggleDropdown} />
            </div>
            {showDropdown && <ul className='profile-dropdown' ref={ulRef}>
                {sessionLinks}
            </ul>}
        </>
    );
}
