import {React} from "react";
import {Card} from 'react-bootstrap';

export const SuggCard = ({movie, onMovieClick})=>{
    return (
        <>
            <Card className="h-10 m-1" onClick = {()=>onMovieClick(movie)}>
                <Card.Img variant="top" src={movie.image}/>
                <Card.Body>
                    <Card.Text>{movie.title}</Card.Text>
                    <Card.Text>({movie.releaseYear})</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}