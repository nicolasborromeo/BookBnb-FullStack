import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'
import { useModal } from "../../context/Modal";
import './SignUpForm.css'
import Logo from '../Logo'

function SignupFormPage() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [errors, setErrors] = useState()
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const user = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            }
            dispatch(sessionActions.signup(user))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json()
                    if (data?.errors) {
                        setErrors(data.errors);
                    }
                });
        } else {
            return setErrors({
                confirmPassword: "Confirm Password field must be the same as the Password field"
            })
        }
    };



    return (
        <div className="signup-form-container">
            {/* <h1>Sign Up</h1> */}
            <form onSubmit={handleSubmit} className="signup-form">
                <Logo />
                <div className="first-name-last-name-container">
                    <label className="sign-up-first-name">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            required
                        />
                    </label>
                    {errors?.firstName && <p className="error-p">{errors.firstName}</p>}
                    <label className="sign-up-last-name">
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required
                        />
                    </label>
                    {errors?.lastName && <p className="error-p">{errors.lastName}</p>}
                </div>
                <label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </label>
                {errors?.email && <p className="error-p">{errors.email}</p>}
                <label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </label>
                {errors?.username && <p className="error-p">{errors.username}</p>}

                <label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </label>
                {errors?.password && <p className="error-p">{errors.password}</p>}
                <label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                </label>
                {errors?.confirmPassword && <p className="error-p">{errors.confirmPassword}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormPage;
