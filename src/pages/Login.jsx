import React from 'react';
import { useRef, useEffect, useContext} from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const {setAuth} = useContext(UserContext)
    const [login, { data, loading, error }] = useMutation(LOGIN)

    useEffect(() => {
      if (data) {
          localStorage.setItem('token', data.login.jwt)
          localStorage.setItem('user', data.login.user.username)
          setAuth(true)
          navigate('/')
      }
      },[data])
    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        login({
            variables: {identifier: emailRef.current.value, password: passwordRef.current.value}}  
        )
    }

    if (loading) return <p>Loading...</p>
    if(error) return <p>Error !</p>

    return (
        <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" ref={emailRef}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordRef}/>
        </div>
        <input type="submit"/>
      </form>
    );
};

export default Login;

const LOGIN = gql`
mutation($identifier: String!, $password: String!) {
    login(
      input: {identifier: $identifier, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`