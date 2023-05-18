import React from 'react'
import { HeaderFile } from './HeaderFile'
import { FooterFile } from './FooterFile'
import { Container } from 'react-bootstrap'


export const Layout = ({ children }) => {
    return (
        <div>
            <HeaderFile />

            <Container className='main'>
                {children}
            </Container>

            <FooterFile />
        </div>
    )
}
