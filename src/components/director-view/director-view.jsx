export const DirectorView = ({movie, onBackClick})=>{
    return(
        <div>
            <h3>{movie.director.name}</h3>
            <img height={300} src={movie.director.img} alt="" />
            <div></div>
            <button onClick = {onBackClick}>
                back to {movie.title}
            </button>
        </div>
    )  
}