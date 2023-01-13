import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';


export const DirectorView = ({movie, onBackClick})=>{
    return(
        <Card className="mt-2" style={{width:"20rem"}}>
            <Card.Body style={{borderRadius:"10px"}}>
                <Card.Title>
                    {movie.director.Name}
                </Card.Title>
                 <Card.Text> Bio: {movie.director.Bio}</Card.Text>
                <Card.Text>Nationality: {movie.director.Nationality}</Card.Text>
            </Card.Body>
            <Button className="mt-1" onClick={onBackClick}>Back to {movie.title}</Button>
        </Card>
    )  
                
}

DirectorView.propTypes = {
    movie: PropTypes.shape({
        director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio : PropTypes.string.isRequired,
            Nationality: PropTypes.string.isRequired,
        }).isRequired,
    }) , 
    onBackClick: PropTypes.func.isRequired,
};