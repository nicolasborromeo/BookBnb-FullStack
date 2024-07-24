import { CgProfile } from "react-icons/cg";
import { useEffect, useState, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'

export default function ProfileButton({ user }) {
    const [showDropdown, setShowDropdown] = useState(false)
    const dispatch = useDispatch();
    const ulRef = useRef()
    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
    };

    const toggleDropdown = (e) => {
        e.stopPropagation()
        setShowDropdown(prev => !prev)
    }

    useEffect(()=> {
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) setShowDropdown(false)
        }
        if(showDropdown) document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showDropdown])

    const ulClassName = 'profile-dropdown' + (showDropdown ? '' : ' hidden');

    return (
        <>
            <div style={{ fontSize: 'x-large' }}>
                <CgProfile onClick={toggleDropdown} />
            </div>
            <ul className={ulClassName} ref={ulRef}>
                <li>{user.username}</li>
                <li>{user.firstName} {user.lastName}</li>
                <li>{user.email}</li>
                <li><NavLink onClick={logout}>Log Out</NavLink></li>
            </ul>
        </>
    );
}
