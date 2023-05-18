import React from 'react'
import { TransTable } from '../TransTable'
import { TransForm } from '../TransForm'

export const Dashboard = () => {
    return (
        <div>
            <div>
                <TransForm />
            </div>

            <div>
                <TransTable />
            </div>
        </div>
    )
}
