import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeA from './Pages/Admin/HomeA'
import Home from './Pages/Home'
import HomeK from './Pages/Kitchen/HomeK'
import HomeT from './Pages/Terminal/HomeT'
import UserProvider from './Provider/UserProvider'



function App() : JSX.Element {

    return (
        <UserProvider>
            <BrowserRouter>

            <Routes>
                <Route path="/" element={<Home />} />


                <Route path="/terminal" element={<HomeT />} />


                <Route path="/admin" element={<HomeA />} />


                <Route path="/kitchen" element={<HomeK />} />
            </Routes>



            </BrowserRouter>
        </UserProvider>
    )
}

export default App
