import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { Link } from 'react-router-dom';
import SignupForm from './SignupForm';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    const handleLinkClick = (e) => {
        e.preventDefault()
        setShowModal(true)
    }

    return (
        <>
            {/* <button onClick={() => setShowModal(true)}>Log In</button> */}
            <Link to='/sign-up' onClick={handleLinkClick} exact='true'>
                Sign Up
            </Link>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
