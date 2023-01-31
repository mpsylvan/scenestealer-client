import React from 'react';
import {Row, Figure, Button, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';



export const SimilarMovies = (({similarMovies}) =>{

    return (
        <Card style={{ border: "none", borderRadius: "5px", boxShadow: "1px 1px 10px 2px"}}>
            <Card.Body>
                <Row>
                    {similarMovies.length === 0 ?(
                        <h3>No similar movies to this one in the database yet. </h3>
                        ): (
                        <>  
                            {similarMovies.map((m)=>(
                                <Col xs={12} md={6} lg={4} xl={3} key={m.key} className="fav-movie">
                                    <Figure>
                                        <Link to = {`/movies/${encodeURIComponent(m.key)}`}>
                                            <Figure.Image  
                                                src={m.image} 
                                                alt= {`movie billboard of ${m.title}`}
                                            />
                                            <Figure.Caption>
                                                {m.title}
                                            </Figure.Caption>
                                        </Link>
                                    </Figure>
                                </Col>
                            ))}              
                        </>
                    )}
                </Row>
            </Card.Body>
        </Card>
    )
    
    
})
// similarMovies.map((m)=>(
//     <Card className="h-10 m-1" onClick = {()=>onMovieClick(movie)}>
//         <Card.Img variant="top" src={movie.image}/>
//         <Card.Body>
//             <Card.Text>{movie.title}</Card.Text>
//             <Card.Text>({movie.releaseYear})</Card.Text>
//         </Card.Body>
//     </Card>
// ))