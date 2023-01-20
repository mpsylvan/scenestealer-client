import {React} from 'react';
import {Row, Col, Button, Card, Figure} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './profile-view.scss'


export const FavoritesView = ({favMovies, removeFav}) => {
    
    return (
        <Card>
            <Card.Body>
                <Row>
                    {favMovies.length === 0 ?(
                        <h3>You have no movies in your favorites. </h3>
                        ): (
                        <>  
                            {favMovies.map((m)=>(
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
                                        <Button onClick = {()=>removeFav(m.key)}> Remove </Button>
                                    </Figure>
                                </Col>
                            ))}              
                        </>
                    )}
                </Row>
            </Card.Body>
        </Card>
    )
}
       
      