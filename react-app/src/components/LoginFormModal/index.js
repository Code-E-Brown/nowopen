import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    const handleLinkClick = (e) => {
        e.preventDefault()
        setShowModal(true)
    }

    return (
        <>
            {/* <button onClick={() => setShowModal(true)}>Log In</button> */}
            <Link to='/login' onClick={handleLinkClick} exact='true'>
                Login
            </Link>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
