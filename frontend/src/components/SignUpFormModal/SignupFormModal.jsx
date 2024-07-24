import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'
import { useModal } from "../../context/Modal";

function SignupFormPage() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [errors, setErrors] = useState()
    const {closeModal} = useModal()

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
                if(data?.errors) {
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
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors?.email && <p className="error-p">{errors.email}</p>}
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors?.username && <p className="error-p">{errors.username}</p>}
                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors?.firstName && <p className="error-p">{errors.firstName}</p>}
                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors?.lastName && <p className="error-p">{errors.lastName}</p>}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors?.password && <p className="error-p">{errors.password}</p>}
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors?.confirmPassword && <p className="error-p">{errors.confirmPassword}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormPage;
