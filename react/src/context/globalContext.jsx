import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)

export function GlobalStateProvider({ children }) {
    const [data, setdata] = useState({
        user: null,
        loginStatus: false,
        token: null,
        role:null,
        checkoutData:null,
    })
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5000/profile`,
            withCredentials: true
        }).then((response) => {
            console.log("context res:", response.data.profile)
            if (response.status === 200) {
                setdata((prev) => ({
                    ...prev,
                    user: response.data.profile,
                    loginStatus: true,
                    role:response.data.profile.role
                }))
            }
        }).catch((error) => {
            console.log(error)
            if (error) {
                setdata((prev) => ({ ...prev, loginStatus: false }));
            }
        })
        return ()=>{
            console.log("clean")
        };

    },[]);

    return(
        <GlobalStateContext.Provider value = {data}>
            <GlobalStateUpdateContext.Provider value = {setdata}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>
    )
}