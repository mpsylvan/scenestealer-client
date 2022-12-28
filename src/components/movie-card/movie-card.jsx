import PropTypes from 'prop-types';

export const MovieCard = ({movie, onMovieClick}) =>{
    return <div className="movie-card" onClick={()=>
            onMovieClick(movie)
        }>{movie.title}</div>
}

MovieCard.propTypes = {
    movie: PropTypes.exact({
        title: PropTypes.string.isRequired
    }),
    onMovieClick: PropTypes.func.isRequired
}

