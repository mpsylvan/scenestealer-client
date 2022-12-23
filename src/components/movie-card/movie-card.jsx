export const MovieCard = ({movie, onMovieClick}) =>{
    return <div className="movie-card" onClick={()=>
            onMovieClick(movie)
        }>{movie.title}</div>
}