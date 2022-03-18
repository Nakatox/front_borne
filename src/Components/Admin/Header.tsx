import React from 'react'
import { useEffect } from 'react';
import {NavLink} from 'react-router-dom'
import {useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify';



const Header = (): JSX.Element => {

    useEffect(() => {
        const socket = io("http://localhost:8000"); 
        socket.off('lowStock').on("lowStock", (data) => {
            toast.error(`Inrgedient "${data.inrgedient.name}" is out of stock`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }, [])

    return (
        <HeaderS>
            <Container style={{marginRight:'20px'}}>
                <Text><NavLink to="/admin/orders">Orders</NavLink></Text>
                <Text><NavLink to="/admin/products">Products</NavLink></Text>
                <Text><NavLink to="/admin/ingredients">Ingredients</NavLink></Text>
                <Text><NavLink to="/admin/terminals">Terminals</NavLink></Text>
            </Container>
        </HeaderS>
    )
}

const HeaderS = styled.div`
display: flex;
background-color: #BCD379;
color: white;
padding: 10px 30px;
`
const Container = styled.div`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
`

const Text = styled.div`
& > a{
    text-decoration: none;
    color: white;
    text-decoration: underline;
}
`
export default Header