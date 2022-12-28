import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import PropTypes from 'prop-types';


export const MainView = ()=>{
    const[movies, setMovies] = useState([]);
    const [selectedDirector, setSelectedDirector] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(()=>{
        fetch("https://scenestealer.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data)=>{
                console.log(data[0])
                const movieData = data.map(movie =>{
                    return {
                        key : movie._id,
                        title : movie.Name,
                        releaseYear : movie.ReleaseYear,
                        studio : movie.Studio,
                        desc: movie.Synopsis,
                        genre: movie.Genre, 
                        director: movie.Director,
                        featured: movie.Feature,
                        country: movie.Country,
                        image: movie.Image,
                    }
                });
                setMovies(movieData);
            })
    })

    if(selectedDirector){
        return<DirectorView movie={selectedMovie} onBackClick={()=>setSelectedDirector(null)}/>
    }

    if(selectedMovie){
        return <MovieView 
        movie={selectedMovie}   
        onBackClick={()=>setSelectedMovie(null)}
        onDirectorClick={()=>setSelectedDirector(true)}/>
        
     
    }

    // if no movies in the moves state variable, display generic message. 
    if(movies.length < 1){
        return <div>No Movies to display!</div>
    }
    
    

    return (
        <div>
            {movies.map((movie) => 
            (<MovieCard key={movie.key} 
                movie={movie} 
                onMovieClick = {(movie)=> setSelectedMovie(movie)}/>
        ))}
        </div>
    );
     

};