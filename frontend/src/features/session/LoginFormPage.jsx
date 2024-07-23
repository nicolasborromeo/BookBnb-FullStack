import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import './login.css'

export default function LoginFormPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    if (sessionUser) return <Navigate to="/" replace={true} />



    const handleSubmit = async (e) => {
        e.preventDefault()
        return dispatch(sessionActions.login({credential, password})).catch(
            async (res) => {
                const data = await res.json();
                if(data?.errors) {
                    console.log(errors)
                    setErrors(data.errors)
                }
            }
        );
    };


    return (
        <div className="login-form-container">
            <form className='login-form' onSubmit={handleSubmit}>
                <div className="login-form-input-container">
                    {/* {error?.data.message === 'Invalid Credentials' && <div className='error-div'>{error.data.message}</div>} */}
                    <div>
                        {/* {error?.data.errors?.credential && <div className='error-div'>{error.data.errors.credential}</div>} */}
                        <input placeholder='Email or username' onChange={e => setCredential(e.target.value)} value={credential}></input>
                    </div>
                    <div>
                        {/* {error?.data.errors?.password && <div className='error-div'>{error.data.errors.password}</div>} */}
                        <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} value={password}></input>
                    </div>
                    <button type='submit'>Log In</button>
                </div>
            </form>

        </div>
    )
}
