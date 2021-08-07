import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import preStyle from '../LoginFormModal/LoginForm.module.css'
import style from './SignupForm.module.css'

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data)
            }
        } else {
            setErrors(["Passwords must match"])
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    // if (user) {
    //     return <Redirect to='/' />;
    // }

    return (
        <form className={style.signupForm} onSubmit={onSignUp}>
            <div className={preStyle.fancyText}>Welcome!</div>
            {/* <div> */}
            {errors.map((error, ind) => (
                <div className={preStyle.error} key={ind}>{error}</div>
            ))}
            {/* </div> */}
            {/* <div> */}
            <div>
                <label>Username</label>
            </div>
            <div>
                <input
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                ></input>
            </div>
            {/* </div> */}
            <div>
                <label>Email</label>
            </div>
            <div>
                <input
                    type='text'
                    name='email'
                    onChange={updateEmail}
                    value={email}
                ></input>
            </div>
            <div>
                <label>Password</label>
            </div>
            <div>
                <input
                    type='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                ></input>
            </div>
            <div>
                <label>Repeat Password</label>
            </div>
            <div>
                <input
                    type='password'
                    name='repeat_password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                ></input>
            </div>
            <div className={style.buttonBox}>
                <button type='submit'>Sign Up</button>
            </div>
        </form>
    );
};

export default SignUpForm;
