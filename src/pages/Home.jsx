import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/User';

const Home = () => {
  const {loading, error, data} = useQuery(BOOKS)
    if (loading) return <p>Loading...</p>
    if(error) return <p>Error !</p>
    console.count()

    return (
        <div className='container'>
            <h1> Home Page</h1>
            <Link to='/signup'>Signup</Link>
            <Link to='/login'>Login</Link>
            <Link to='/logout'> Logout </Link>
            <div className='row'>
            {data.books.data.map(item => {
              return (
                <Card 
                  className='col-3'
                  key={item.id} 
                  title={item.attributes.title} 
                  author={item.attributes.author}
                  image={"http://localhost:1337" + item.attributes.image.data.attributes.url}
                  category={item.attributes.categories.data.map(item => <span key={item.attributes.name}> {item.attributes.name} </span>)}
                  alt={item.attributes.title}
                  link={`book/${item.id}`}
                  />
                  
              )
            })}
            </div>
            
        </div>
    );
};

export default Home;

const BOOKS = gql`
query GetBooks {
  books {
    data {
      id
      attributes {
        title
        author
        image {
          data {
            attributes {
              url
            }
          }
        }
        categories {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
`