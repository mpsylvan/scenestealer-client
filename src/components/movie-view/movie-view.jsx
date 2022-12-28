import PropTypes from 'prop-types';

export const MovieView = ({movie,  onBackClick, onDirectorClick})=>{
    return (
        <div>
            <div>
                <img src= {movie.image} alt="" />
            </div>
            <div>
                <span> Title: </span>
                <span> {movie.title} </span>
            </div>
            <div>
                <span>Director: </span>
                <span className ='director' onClick ={onDirectorClick} >{movie.director.Name}</span>
            </div>
            <div>
                <span>Studio: </span>
                <span>{movie.studio}</span>
            </div>
            <div>
                <span>Released: </span>
                <span>{movie.releaseYear}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.desc}</span>
            </div>
            <button onClick={onBackClick}>Back to Movies</button>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        image: PropTypes.string.isRequired, 
        title: PropTypes.string.isRequired, 
        director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            NNationality: PropTypes.string.isRequired,
        }),
        releaseYear: PropTypes.number.isRequired,
        desc: PropTypes.string.isRequired,
        studio: PropTypes.string.isRequired,
    }),
    onBackClick : PropTypes.func.isRequired,
    onDirectorClick: PropTypes.func.isRequired,
}