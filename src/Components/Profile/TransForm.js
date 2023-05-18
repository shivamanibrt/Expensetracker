import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Custominput } from '../CustomInput/Custominput'
import { useDispatch, useSelector } from 'react-redux';
import { addTransactionAction } from '../Redux/Transaction/Transaction';


export const TransForm = () => {
    const [dt, setDt] = useState({});
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const handelOnChange = e => {
        const { name, value } = e.target;
        setDt({
            ...dt,
            [name]: value,
        });

    }
    const handelOnSubmit = (e) => {
        e.preventDefault();
        dispatch(addTransactionAction({ ...dt, userId: user.uid }));
    }
    return (
        <div className="mt-5">
            <Form className="border rounded p-3 shadow-lg" onSubmit={handelOnSubmit}>
                <Row>
                    <Col md="2">
                        <Form.Group className="mb-3 ">
                            <Form.Select name="type" required onChange={handelOnChange}>
                                <option value="">Select</option>
                                <option value="income">Income</option>
                                <option value="expenses">Expenses</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md="4">
                        <Custominput
                            onChange={handelOnChange}
                            name="name"
                            placeholder="Salary"
                            required={true}
                        />
                    </Col>
                    <Col md="1">
                        <Custominput
                            onChange={handelOnChange}
                            name="amount"
                            type="number"
                            placeholder="100"
                            required
                            min="1"
                        />
                    </Col>
                    <Col md="3">
                        <Custominput
                            onChange={handelOnChange}
                            name="date"
                            type="date"
                            required
                        />
                    </Col>
                    <Col md="2">
                        <Form.Group className="mb-3 d-grid">
                            <Button variant="warning" type="submit" >
                                Add{" "}
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
