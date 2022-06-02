import { createContext, useEffect, useState } from "react";

const UserContext = createContext({})

const UserContextProvider = props => {
    const [auth, setAuth] = useState(false)
    console.log("auth", auth);


    
    useEffect(() => {
       if(localStorage.getItem('token') && localStorage.getItem('user')) {
           setAuth(true)
       } else {
        localStorage.clear()
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