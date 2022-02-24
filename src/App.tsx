import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OrderT from './Components/Terminal/OrderT'
import HomeA from './Pages/Admin/HomeA'
import Home from './Pages/Home'
import HomeK from './Pages/Kitchen/HomeK'
import HomeT from './Pages/Terminal/HomeT'
import CartProvider from './Provider/CartProvider'
import IngredientProvider from './Provider/IngredientProvider'
import OrderProvider from './Provider/OrderProvider'
import UserProvider from './Provider/UserProvider'



function App() : JSX.Element {

    return (
        <UserProvider>
        <CartProvider>
        <OrderProvider>
        <IngredientProvider>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/terminal" element={<HomeT />} />
                    <Route path="/terminal/order" element={<OrderT />} />

                    <Route path="/admin" element={<HomeA />} />

                    <Route path="/kitchen" element={<HomeK />} />
                </Routes>
            </BrowserRouter>

        </IngredientProvider>
        </OrderProvider>
        </CartProvider>
        </UserProvider>
    )
}

export default App
