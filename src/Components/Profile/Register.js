import React, { useState } from 'react'

import { Button, Form } from 'react-bootstrap'

import { Custominput } from '../CustomInput/Custominput';

import { toast } from 'react-toastify';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const Register = () => {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handelOnChange = e => {
        try {

            const { name, value } = e.target;
            if (name === 'password') {
                setError('');
                value.length < 6 && setError('Password is too short');
                !/[0-9]/.test(value) && setError('Password must include Number');
                !/[A-Z]/.test(value) && setError('Password must include Capital letter');
                !/[a-z]/.test(value) && setError('Password must include Small letter');
            }
            setFormData({
                ...formData,
                [name]: value
            });
            // console.log(name, value);
        } catch (error) {
            toast.error(error.message)
        }

    }

    const handelOnSubmit = async (e) => {
        try {
            e.preventDefault();
            const { confirmPassword, password, email } = formData
            if (confirmPassword !== password) {
                toast.error('Password do not match')
                return;
            }
            //Creating to email and password to authentication 
            const pendingState = createUserWithEmailAndPassword(auth, email, password);
            toast.promise(pendingState, {
                pending: 'Please wait',
            })

            //if user is created 
            const { user } = await pendingState;
            if (user?.uid) {
                //now user is registered

                const userObj = {
                    fName: formData.fName,
                    lName: formData.lName,
                    email: formData.email
                }
                //send user to firestore database. 
                await setDoc(doc(db, 'user', user.uid), userObj);
                toast.success('User has been registered now you may login');
                navigate('/');
            }

        } catch (error) {
            toast.error(error.message)
        }

    }
    const inputField = [{
        label: 'First Name',
        name: 'fName',
        placeholder: 'John'
    },
    {
        label: 'Last Name',
        name: 'lName',
        placeholder: 'Doe'
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'johndoe@email.com'
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: '******',
        required: true
    },
    {
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
        placeholder: '******',
        required: true
    },
    ];

    return (
        <div className='form-holder'>
            <Form className='shadow-lg p-3 rounded mt-5' onSubmit={handelOnSubmit}>
                <h3>Welcome to Expense Tracker</h3>
                {
                    inputField.map((item, i) =>
                        <Custominput {...item} key={i} onChange={handelOnChange} />
                    )
                }
                <div className="p-3 mb-4">
                    Password should be longer than 6 characters and contain at least 1 capital and small letter and number.
                    <Form.Text>{error && <ul><li className="text-danger">{error}</li></ul>}</Form.Text>
                </div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
};
