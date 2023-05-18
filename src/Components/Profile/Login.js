import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Custominput } from '../CustomInput/Custominput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/User/userAction';


export const Login = () => {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        user?.uid && navigate('/dashboard');
    }, [user?.uid, navigate])

    const handelOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const handelOnSubmit = e => {
        e.preventDefault();
        dispatch(loginUser(formData));
    }

    const inputField = [{
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'johndoe@email.com'
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: '******'
    },
    ]
    return (
        <div className='form-holder'>
            <Form className='shadow-lg p-3 rounded mt-5' onSubmit={handelOnSubmit}>
                <h3>Welcome to Expense Tracker</h3>
                {
                    inputField.map((item, i) =>
                        <Custominput {...item} key={i} onChange={handelOnChange} />
                    )
                }
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>

    )
}
