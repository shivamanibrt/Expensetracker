import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai'
import { addTransactionAction, deleteTranAction, getTransaction } from '../Redux/Transaction/Transaction';


export const TransTable = () => {
    const dispatch = useDispatch();
    const { trans } = useSelector((state) => state.transaction);
    const { user } = useSelector((state) => state.user);


    //we do this because to show any existing table 
    useEffect(() => { !trans.length && dispatch(addTransactionAction(user.uid)) }, [trans.length, dispatch, user])


    const handelOnDelete = id => {
        if (window.confirm('Are you sure you want to delete this ?')) {
            dispatch(deleteTranAction(id, user.uid));
        }
    }
    const total = trans.reduce((acc, item) => {
        return item.type === 'income ' ? acc + +item.amount
            : acc - +item.amount
    }, 0)

    return (
        <div className='mt-5'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Income</th>
                        <th>Expense</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {trans.map((item, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.date}</td>
                            {item.type === 'income' ?
                                (
                                    <>
                                        <td className='text-success'>{item.amount}</td>
                                        <td></td>
                                    </>
                                )
                                : (
                                    <>
                                        <td></td>
                                        <td className='text-danger'>{item.amount}</td>
                                    </>
                                )
                            }

                            <td>
                                <Button variant='warning' onClick={() => { handelOnDelete(item.id) }} >
                                    <AiFillDelete />
                                </Button>
                            </td>
                        </tr>

                    ))}
                    <tr className='fw-bold'>
                        <td colSpan={4}>Total </td>
                        <td colSpan={2}>{total}</td>
                    </tr>



                </tbody>
            </Table >
        </div >
    );
};
