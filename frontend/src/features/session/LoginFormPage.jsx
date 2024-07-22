import { useState } from "react"
import { useLoginUserMutation } from './sessionAPI'
import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import './login.css'

export default function LoginFormPage() {
    const [password, setPassword] = useState('')
    const [credential, setCredential] = useState('')
    const sessionUser = useSelector(state => state.session.user)
    const [loginUser, { error}] = useLoginUserMutation()

    if (sessionUser) return <Navigate to="/" replace={true} />

    const handleSubmit = async (e) => {
        e.preventDefault()
        const credentials = { credential: credential, password: password }
        try {
            const data = await loginUser(credentials).unwrap()
            console.log('success: ', data)
        } catch (err) {
            console.error('Failed to login: ', err)
        }
        setCredential('')
        setPassword('')
    }


    return (
        <div className="login-form-container">
            <form className='login-form' onSubmit={handleSubmit}>
                <div className="login-form-input-container">
                    {error?.data.message === 'Invalid Credentials' && <div className='error-div'>{error.data.message}</div>}
                    <div>
                        {error?.data.errors?.credential && <div className='error-div'>{error.data.errors.credential}</div>}
                        <input placeholder='Email or username' onChange={e => setCredential(e.target.value)} value={credential}></input>
                    </div>
                    <div>
                        {error?.data.errors?.password && <div className='error-div'>{error.data.errors.password}</div>}
                        <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} value={password}></input>
                    </div>
                    <button type='submit'>Log In</button>
                </div>
            </form>

        </div>
    )
}
