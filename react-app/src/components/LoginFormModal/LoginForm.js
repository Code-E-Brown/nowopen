import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { login } from '../../store/session';
import style from './LoginForm.module.css';
import SignupFormModal from '../SignupFormModal';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory()

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const demoLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demo@aa.io', "password"));
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    // if (user) {
    //     return <Redirect to='/' />;
    // }

    return (
        <form className={style.loginForm} onSubmit={onLogin}>
            <div className={style.fancyText}>Welcome back!</div>
            {/* <div> */}
            {errors.map((error, ind) => (
                <div className={style.error} key={ind}>{error}</div>
            ))}
            {/* </div> */}
            {/* <div> */}
            <div>
                <label htmlFor='email'>Email</label>
            </div>
            <div>

                <input
                    name='email'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                />
            </div>
            {/* </div> */}
            {/* <div> */}
            <div>
                <label htmlFor='password'>Password</label>
            </div>
            <div>
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                />
            </div>
            <div className={style.buttonBox}>
                <button type='submit'>Login</button>
            </div>
            <div className={style.demoButtonBox}>
                <button onClick={demoLogin}>Demo</button>
            </div>

            {/* </div> */}
        </form >
    );
};

export default LoginForm;
