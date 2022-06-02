import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';


const Review = () => {
    const contentRef = useRef()
    const noteRef = useRef()
    const {id} = useParams()
    const {loading, data} = useQuery(GETREVIEWS)
    const [createReview, { error }] = useMutation(CREATEREVIEW)
    if (error) {
        console.log("error", error);
    }
    if (loading) return <p>Loading...</p>

    
    const handleSubmit = (e) => {
        e.preventDefault()
        createReview({
            variables : {content: contentRef.current.value, note: Number(noteRef.current.value), book: id, author: localStorage.getItem('user')},
            refetchQueries : [GETREVIEWS]
        })
        e.target.reset()
    }
    console.log(data);
    return (
        <>
                {data.reviews.data.map(item => {
                    return (
                        <div className='d-flex'>
                            <p className='p-2'><b> {item.attributes.author} </b></p>
                            <p className='p-2'> {item.attributes.content}</p>
                            <span className='p-2'> note : {item.attributes.note} </span>
                        </div>
                    )
                })}
            <p> Ajouter une review </p> 
            <form onSubmit={handleSubmit}>
                <div>
                <label>Content</label>
                <textarea required="required" ref={contentRef} cols="40" rows="5"></textarea>
                </div>
                <div>
                <label>Note</label>
                <input type="number" min='0' max='10' ref={noteRef}/>
                </div>
                <input type="submit"/>
            </form>
        </>
    );
};

export default Review;

const CREATEREVIEW = gql`
mutation($content: String!, $note: Int!, $book: ID!, $author: String!) {
    createReview(data: {content: $content, note: $note, book: $book, author: $author }) {
      data {
        attributes {
          content
          note
          author
        }
      }
    }
  }
`
const GETREVIEWS = gql`
query {
    reviews {
      data {
        attributes {
          note
          content
          author
        }
      }
    }
  }
`