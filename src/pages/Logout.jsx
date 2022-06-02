import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';


const Logout = () => {
    const {setAuth} = useContext(UserContext)
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.clear()
        setAuth(false)
        navigate('/')
    }
    return (
        <button onClick={handleClick}>
            Logout
        </button>
    );
};

export default Logout;