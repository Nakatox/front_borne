import React from 'react'
import {NavLink} from 'react-router-dom'
import {useNavigate } from "react-router-dom";
import styled from 'styled-components'


const Header = (): JSX.Element => {

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