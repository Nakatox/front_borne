import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {PrivateRoute} from './Components/PrivateRoute/PrivateRoute'
import IngredientsA from './Pages/Admin/IngredientsA'
import OrdersA from './Pages/Admin/OrdersA'
import ProductsA from './Pages/Admin/ProductsA'
import TerminalsA from './Pages/Admin/TerminalsA'
import Home from './Pages/Home'
import HomeK from './Pages/Kitchen/HomeK'
import HomeT from './Pages/Terminal/HomeT'
import InvoiceT from './Pages/Terminal/InvoiceT'
import OrderDone from './Pages/Terminal/OrderDone'
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

                    <Route element={<PrivateRoute />} >

                        <Route path="/terminal" element={<HomeT />} />
                        <Route path="/terminal/order" element={<InvoiceT />} />
                        <Route path="/terminal/order/done/:orderNumber" element={<OrderDone />} />

                        <Route path="/admin/products" element={<ProductsA />} />
                        <Route path="/admin/ingredients" element={<IngredientsA />} />
                        <Route path="/admin/orders" element={<OrdersA />} />
                        <Route path="/admin/terminals" element={<TerminalsA />} />

                        <Route path="/kitchen" element={<HomeK />} />

                        <Route path="*" element={<Home />} />

                    </Route>

                </Routes>
            </BrowserRouter>

        </IngredientProvider>
        </OrderProvider>
        </CartProvider>
        </UserProvider>
    )
}

export default App
