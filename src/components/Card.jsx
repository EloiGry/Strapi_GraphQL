import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({title, author, image, alt, category, link}) => {
    return (
        <div className="card m-4" style={{width: "15rem"}}>
            <img src={image} className="card-img-top" alt={alt} style={{width: "100%"}}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {/* <h6 className="card-title">{subtitle}</h6> */}
                <p className="card-text">{author}</p>
                <div className="card-text">{category}</div>
                <Link to={link} className="btn btn-primary mt-1">Voir Plus</Link>
            </div>
        </div>
    );
};

export default Card;