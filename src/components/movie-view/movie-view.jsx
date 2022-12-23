export const MovieView = ({movie,  onBackClick, onDirectorClick})=>{
    return (
        <div>
            <div>
                <img src= {movie.img} alt="" />
            </div>
            <div>
                <span> Title: </span>
                <span> {movie.title} </span>
            </div>
            <div>
                <span>Director: </span>
                <span className ='director' onClick ={onDirectorClick} >{movie.director.name}</span>
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