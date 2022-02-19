import React from 'react'
import { NavLink } from 'react-router-dom'
import FormLogin from '../Components/Login/FormLogin'

const Home = () => {
  return (
    <div>
        <h1>Home</h1>
        <div>
            <FormLogin></FormLogin>
        </div>
    </div>
  )
}

export default Home