import { createContext, useEffect, useState } from "react";

const UserContext = createContext({})

const UserContextProvider = props => {
    const [auth, setAuth] = useState(false)

    
    useEffect(() => {
       if(localStorage.getItem("token")) {
           setAuth(true)
       }
    },[])
    
    const value = {
        auth,
        setAuth
    }
    
    return (
        <UserContext.Provider value = {value}>
            {props.children}
        </UserContext.Provider>
    )

}

export {
    UserContextProvider,
    UserContext
}