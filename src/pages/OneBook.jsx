import React from 'react';
import { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/User';
import Review from '../components/Review';

const OneBook = () => {
    const {id} = useParams()
    const book = useQuery(BOOK, {variables: {id : id}})
    const {auth} = useContext(UserContext)
   
    
    if (book.loading) return <p>Loading...</p>
    if(book.error) return <p>Error !</p>
    
        const filter = book.data.book.data.attributes.categories.data[0].attributes.books.data.filter(item => item.attributes.title !== book.data.book.data.attributes.title)
        console.log("filte", filter);
    
    console.count()
    return (
        <>
            <div>
                <h1> {book.data.book.data.attributes.title} </h1>
                <h2> {book.data.book.data.attributes.subtitle && book.data.book.data.attributes.subtitle}</h2>
                <p> {book.data.book.data.attributes.description}</p>
                <img src={`http://localhost:1337${book.data.book.data.attributes.image.data.attributes.url}`} alt="" width='200px' />
                {auth ?
                  (<> 
                    <Review/>
                   </>) : 
                  (<> Veuillez vous connecter pour ajouter une review </>)
                }
            </div>
            <br />
            <h5>
                Recommandations
                
            </h5>
            <div className='d-flex'>
            {filter.map(item => {
                    return (
                        <p>{item.attributes.title}</p>
                    )
                })}
            </div>
        </>
    );
};

export default OneBook;

const BOOK = gql`
query getBook($id : ID!) {
    book(id : $id) {
        data {
            attributes {
              title
              categories {
                data {
                  attributes {
                    books {
                      data {
                        attributes {
                          title
                          image {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
    }
} 
`
