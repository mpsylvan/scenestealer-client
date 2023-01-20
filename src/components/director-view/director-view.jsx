import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


export const DirectorView = ({movies})=>{

    const {directorName} = useParams();

    let movie = movies.find((m)=>m.director.Name === directorName);
    
    return(
        <>
            <Card className="mt-2" style={{width:"20rem"}}>
                <Card.Body style={{borderRadius:"10px"}}>
                    <Card.Title>
                        {movie.director.Name}
                    </Card.Title>
                    <Card.Text> Bio: {movie.director.Bio}</Card.Text>
                    <Card.Text>Nationality: {movie.director.Nationality}</Card.Text>
                </Card.Body>
                <Link to={`/movies/${encodeURIComponent(movie.key)}`}>
                    <Button className="mt-1" variant='link'>Back to {movie.title}</Button>
                </Link>
            </Card>
        </>
    )  
                
}

// DirectorView.propTypes = {
//     movie: PropTypes.shape({
//         director: PropTypes.shape({
//             Name: PropTypes.string.isRequired,
//             Bio : PropTypes.string.isRequired,
//             Nationality: PropTypes.string.isRequired,
//         }).isRequired,
//     }) , 
//     onBackClick: PropTypes.func.isRequired,
// };