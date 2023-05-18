import { signOut } from 'firebase/auth';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebaseConfig';
import { setUser } from '../Redux/User/userSlice';
import { toast } from 'react-toastify';
import { GiExpense } from 'react-icons/gi';
import { GoDashboard } from 'react-icons/go';
import { FiLogOut } from 'react-icons/fi';
import { FiLogIn } from 'react-icons/fi';
import { GiArchiveRegister } from 'react-icons/gi';

export const HeaderFile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handelOnLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch(setUser({}));
                toast.success('User logged out')
            })
            .catch((error) => {
                toast.error(error.message)
            });
        navigate('/');
    }
    return (
        <Container>
            <Navbar >
                <Container fluid>
                    <Navbar.Brand href="/login">
                        <GiExpense />Expense</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        <Nav>
                            {
                                user?.uid ? (
                                    <>
                                        <Nav.Link as={Link} to="/dashboard">
                                            <GoDashboard /> Dashboard</Nav.Link>
                                        <Nav.Link as={Link} to="/" onClick={handelOnLogout}><FiLogOut /> Logout</Nav.Link>
                                    </>

                                ) : (<> <Nav.Link as={Link} to="/"><FiLogIn /> Login</Nav.Link>
                                    <Nav.Link as={Link} to="/register"><GiArchiveRegister /> Register</Nav.Link></>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </Container>

    )
}
