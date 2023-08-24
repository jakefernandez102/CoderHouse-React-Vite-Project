/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    useEffect(()=>{
        async function getUsers(){
            const {data} = await axios.get('http://localhost:4000/Users');
            console.log(data)
        }
        // getUsers()
    },[])

    return (
    <AuthContext.Provider
        value={{

        }}
    >
        {children}
    </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext