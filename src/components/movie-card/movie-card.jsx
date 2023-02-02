import React from "react";
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/users/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faPlus} from '@fortawesome/free-solid-svg-icons'




export const MovieCard = ({movie}) =>{
    const user = useSelector((state)=>state.user.user);
    const dispatch = useDispatch();
    const AddFavorite = (id) => {
            fetch(`https://scenestealer.herokuapp.com/users/${user.Username}/favorites/${id}`,
                {
                    method: "POST",
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                }  
            ).then((response)=> response.json()).then((data)=>{
                if(data.newUser){
                    localStorage.setItem('user', JSON.stringify(data.newUser));
                    dispatch(setUser(data.newUser));

                }else{
                    alert('unable to add movie to favorites.')
                    window.location.reload();
                }
            }).catch((e)=>{
                console.log(e);
            })
        }


    return (
        <Card className="h-100" style={{ border: "none", borderRadius: "5px", boxShadow: "1px 1px 10px 2px"}}>
            <Card.Img variant='top'   src={movie.image}/>
            <Card.Body style={{borderRadius: "5px"}}>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>({movie.releaseYear})</Card.Text>
                 <Link to ={`/movies/${encodeURIComponent(movie.key)}`}>
                    <Button variant="link"> Open </Button>
                 </Link>
                <Button variant = "info" className ="mt-2 movie-card-btn" onClick={()=>AddFavorite(movie?.key)}><FontAwesomeIcon icon={faPlus}/> to Favorites</Button>
            </Card.Body>
        </Card>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired
    }),
    // onMovieClick: PropTypes.func.isRequired
}

