import React from 'react'
import { GetToken } from '../../Services/CheckConnected'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute = () => {
    const auth = GetToken();
    return auth ? <Outlet /> : <Navigate to="/"/> ;
}
