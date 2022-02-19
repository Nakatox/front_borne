import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { CheckConnected, GetToken } from '../Services/CheckConnected'
import { GetCurrentUser } from '../Services/UserAPI'

export const UserContext = createContext()

const UserProvider = (props: any) : JSX.Element => {

    const [user, setUser] = useState([])

    const getUser = async () => {
        const token = GetToken()

        if (token) {
            const response = await GetCurrentUser()
            if (response) {
                setUser(response)
            }
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider