import PropTypes from 'prop-types';

export const DirectorView = ({movie, onBackClick})=>{
    return(
        <div>
            <h3>{movie.director.Name}</h3>
            <div>
                <span>bio: </span>
                <span>{movie.director.Bio}</span>
            </div>
            <div>
                <span>nationality: </span>
                <span>{movie.director.Nationality}</span>
            </div>
            <button onClick = {onBackClick}>
                back to {movie.title}
            </button>
        </div>
    )  
}

DirectorView.propTypes = {
    movie: PropTypes.shape({
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio : PropTypes.string.isRequired,
            nationality: PropTypes.string.isRequired,
        }).isRequired,
    }) , 
    onBackClick: PropTypes.func.isRequired,
};