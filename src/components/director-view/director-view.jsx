export const DirectorView = ({movie, onBackClick})=>{
    return(
        <div>
            <button onClick = {onBackClick}>
                back to {movie.title}
            </button>
            <h3>{movie.director.name}</h3>
            <img height={300} src={movie.director.img} alt="" />
        </div>
    )  
}