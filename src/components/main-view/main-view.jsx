import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import {LoginView} from "../login-view/login-view"
import { SignupView } from "../signup-view/signup-view";



export const MainView = ()=>{
    // 
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const[movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedDirector, setSelectedDirector] = useState(null);

    useEffect(()=>{
        if(!token){
            return
        }
        fetch("https://scenestealer.herokuapp.com/movies",{
            headers: {Authorization: `Bearer: ${token}`}
        } 
        )
            .then((response) => response.json())
            .then((data)=>{
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
    }, [token])
        
    if(!user){
        return (
            <>
                <LoginView  onLoggedIn = {(user, token)=>{
                    setUser(user);
                    setToken(token);
                }}/>
                <SignupView onLoggedIn = {(user)=>setUser(user)}/>
            </>
            )
        }

    if(selectedDirector){
        
        let directedArr =  movies.filter((movie) => movie.director.Name === selectedMovie.director.Name && movie.title !== selectedMovie.title)
        
        return(
            <div>
                <DirectorView 
                    movie={selectedMovie} 
                    onBackClick={()=>setSelectedDirector(null)}
                />
                <hr />
                <h3> Other films directed by {selectedMovie.director.Name}</h3>
                {directedArr.map((movie) => 
                    (<MovieCard key={movie.key} 
                    movie={movie} 
                    onMovieClick = {(movie)=> setSelectedMovie(movie)}/>
                ))}
            </div>
        )
    }

    if(selectedMovie){
        let genreMatchArr = movies.filter((movie) => {
            return movie.genre.Name === selectedMovie.genre.Name && movie.title !== selectedMovie.title  
        })
        return  (
            <div>
                <MovieView 
                movie={selectedMovie}   
                onBackClick={()=>setSelectedMovie(null)}
                onDirectorClick={()=>setSelectedDirector(true)}/>
                <hr />
                <h2>Similar Movies</h2>
                {genreMatchArr.map((movie) => 
                    (<MovieCard 
                        key={movie.key} 
                        movie={movie} 
                        onMovieClick = {(movie)=> setSelectedMovie(movie)}/>)
            )}
            </div>
        ) 
       
        
     
    }

    // if no movies in the moves state variable, display generic message. 
    if(movies.length < 1){
        return <div>No Movies to display!</div>
    }
    
    
    // finally, MainView renders each movie object as a MovieCard
    return (
        <div>
            {movies.map((movie) => 
            (<MovieCard key={movie.key} 
                movie={movie} 
                onMovieClick = {(movie)=> setSelectedMovie(movie)}/>
            ))}
            <button onClick={()=>{setUser(null); setToken(null)}}> Logout </button>
        </div>
    );
     

};