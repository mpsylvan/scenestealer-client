import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import {LoginView} from "../login-view/login-view"
import { SignupView } from "../signup-view/signup-view";
import {Row, Col, Button} from 'react-bootstrap';



export const MainView = ()=>{
    // uses local storage to access user/token items set via a successful login and stores them as variables to persist auth state. 
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    // state variables and their setters used for persisting authentication after a successful login and presenting movie data based on api requests and/or click events. 
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const[movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedDirector, setSelectedDirector] = useState(null);

    // if jwt persists in local storage, use it to make fetch request to grab all movies. 
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
        

    
    
    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col>
                    <LoginView onLoggedIn={(user, token)=>{
                        setUser(user);
                        setToken(token);
                        }}
                    />
                    <SignupView/>
                </Col>
            ): selectedDirector ? (
                <Col>
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
                </Col>
            ) : selectedMovie ? (
                <Col>
                    <MovieView 
                        movie={selectedMovie}   
                        onBackClick={()=>setSelectedMovie(null)}
                        onDirectorClick={()=>setSelectedDirector(true)}
                    />
                    <hr />
                    <h2>Similar Movies</h2>
                    {genreMatchArr.map((movie) => 
                        (<MovieCard 
                            key={movie.key} 
                            movie={movie} 
                            onMovieClick = {(movie)=> setSelectedMovie(movie)}/>)
                    )}
                </Col>
            ): (movies.length < 1) ?(
                <Col>
                    <div>No Movies to display!</div>
                </Col>
            ): (
                <>
                    <Col className="mb-3" md={3} key={movie.key}>
                        {movies.map((movie)=>{
                            (<MovieCard 
                                movie = {movie}
                                onMovieClick = {(movie)=> setSelectedMovie(movie)}/>
                            )
                        })}
                        <Button onClick ={()=>{setUser(null); setToken(null)}}> Logout</Button>
                    </Col>
                </>
            )}
        </Row>
        );
    };
    
