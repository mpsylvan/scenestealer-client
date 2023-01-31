import React from "react";
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export const FavMovieCard = ({movie}) =>{
    return (
        <Card className="h-100" style={{ border: "none", borderRadius: "5px", boxShadow: "1px 1px 10px 2px"}}>
            <Card.Img variant='top'   src={movie.image}/>
            <Card.Body style={{borderRadius: "5px"}}>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>({movie.releaseYear})</Card.Text>
                <Link to="/profile">
                    <FontAwesomeIcon icon={faStar}/>
                </Link>
                 <Link to ={`/movies/${encodeURIComponent(movie.key)}`}>
                    <Button variant="link"> Open </Button>
                 </Link>
            </Card.Body>
        </Card>
    );
}

FavMovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired
    }),
    // onMovieClick: PropTypes.func.isRequired
}

