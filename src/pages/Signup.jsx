import React from 'react';
import { useRef } from 'react';
import { useMutation, gql } from '@apollo/client';


const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef()
    const passwordRef = useRef()
    const [mutateSignup, {loading, error }] = useMutation(SIGNUP)

    const handleSubmit = async(e) => {
        await e.preventDefault()
        await mutateSignup({
            variables: {username : nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value}}
        )
    }

        if (loading) return <p>Loading...</p>
        if(error) return <p>Error !</p>

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" ref={nameRef}/>
        </div>
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

export default Signup;

const SIGNUP = gql`
mutation($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`