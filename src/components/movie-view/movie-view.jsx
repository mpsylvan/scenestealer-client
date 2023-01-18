import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const MovieView = ({movies, onDirectorClick})=>{

    const {movieID} = useParams();

    const movie = movies.find((m)=> m.key === movieID);
    

    return (
        <>
   
            <Card style={{width: "20rem"}}>
                <Card.Img variant="top" src={movie.image}/>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Link to={"/"}>
                        <Card.Text className='director' onClick={onDirectorClick}><strong>Director: </strong>{movie.director.Name}</Card.Text>
                    </Link>
                    <Card.Text><strong>Released:  </strong> {movie.releaseYear}</Card.Text>
                    <Card.Text><strong>Studio: </strong> {movie.studio}</Card.Text>
                    <Card.Text><strong>Synopsis:  </strong> {movie.desc}</Card.Text>
                    <Card.Text><strong>Genre: </strong> {movie.genre.Name}</Card.Text>
                </Card.Body>
                <Link to={"/"}>
                    <Button className="mt-2" >Back to Movies</Button>
                </Link>
            </Card>
            
        </>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        image: PropTypes.string.isRequired, 
        title: PropTypes.string.isRequired, 
        director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Nationality: PropTypes.string.isRequired,
        }),
        releaseYear: PropTypes.number.isRequired,
        desc: PropTypes.string.isRequired,
        studio: PropTypes.string.isRequired,
    }),
    // onBackClick : PropTypes.func.isRequired,
    // onDirectorClick: PropTypes.func.isRequired,
}
        // <div>
        //     <div>
        //         <img src= {movie.image} alt="" />
        //     </div>
        //     <div>
        //         <span> Title: </span>
        //         <span> {movie.title} </span>
        //     </div>
        //     <div>
        //         <span>Director: </span>
        //         <span className ='director' onClick ={onDirectorClick} >{movie.director.Name}</span>
        //     </div>
        //     <div>
        //         <span>Studio: </span>
        //         <span>{movie.studio}</span>
        //     </div>
        //     <div>
        //         <span>Released: </span>
        //         <span>{movie.releaseYear}</span>
        //     </div>
        //     <div>
        //         <span>Description: </span>
        //         <span>{movie.desc}</span>
        //     </div>
        //     <div>
        //         <span>Genre: </span>
        //         <span>{movie.genre.Name}</span>
        //     </div>