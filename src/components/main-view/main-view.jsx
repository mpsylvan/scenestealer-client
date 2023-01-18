import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { SuggCard } from "../suggestion-card/suggestion-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import {LoginView} from "../login-view/login-view"
import { SignupView } from "../signup-view/signup-view";
import {NavigationBar} from "../navbar-view/navbar-view";
import {Row, Col, Button} from 'react-bootstrap';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';



export const MainView = ()=>{
    //uses local storage to access user/token items set via a successful login and stores them as variables to persist auth state. 
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    // state variables and their setters used for persisting authentication and presenting movie data and click states. 
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const[movies, setMovies] = useState([]);
    const [selectedDirector, setSelectedDirector] = useState(null);

    // if jwt persists in local storage, use it to make fetch request to grab all movies, if it doesn't skip the use effect. 
    useEffect(()=>{
        if(!token){
            return;
        }
        fetch("https://scenestealer.herokuapp.com/movies",{
            headers: {Authorization: `Bearer ${token}`}
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
                console.log(movies)
            })
        }, [token])
        

   
    
    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut = {()=>{setUser(null); setToken(null); localStorage.clear();}}
            />
        
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element = {
                            <>
                                { user ? (
                                        <Navigate to="/"/>
                                    ) : (
                                        <Col md={5}>
                                            <SignupView/>
                                        </Col>
                                    )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element = {
                            <>
                                { user ?
                                    (
                                        <Navigate to="/"/>
                                    ) : (
                                        <Col md={5}>
                                            <LoginView onLoggedIn={(user)=>{setUser(user); setToken(token);}}/>
                                        </Col>
                                    )}
                            </>
                        }
                    />
                    <Route 
                        path = "movies/:movieID"
                        element = {
                            <>
                                { !user ? (
                                    <Navigate to = "/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>
                                        <h3> There are no movies to display ! </h3>
                                    </Col>
                                ) : (
                                   <Col md = {8}>
                                        <MovieView 
                                            movies = {movies}
                                        />
                                   </Col>
                                )}
                            </>
                        }
                    />
                    <Route 
                        path = "/"
                        element = {
                            <>
                                { !user ? (
                                    <Navigate to = "/login"  replace />
                                ) : movies.length === 0 ? (
                                        <Col>
                                            <h3>There are no movies to display!</h3>
                                        </Col>
                                ) : (
                                    <>
                                        {movies.map((movie)=>(
                                            <Col className = "mb-4" key = {movie.key} md={3}>
                                                <MovieCard 
                                                    movie = {movie}
                                                />
                                            </Col>
                                        ))}
                                        
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>        
            </Row>
           </BrowserRouter>
        );
    };
    
    
        {/* {!user ? (
                    <Col className="mt-4" md={6}>
                        <LoginView onLoggedIn={(user, token)=>{
                            setUser(user);
                            setToken(token);
                            }}
                        />
                        <hr />
                        <SignupView/>
                    </Col>
                ): selectedDirector ? (
                    
                    <Col  style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center' }} className="mb-5 mt-8" md={8}>
                        <DirectorView
                        movie={selectedMovie} 
                        onBackClick={()=>setSelectedDirector(null)}
                        />
                        <hr />
                        <h3> Other films directed by {selectedMovie.director.Name}</h3>
                        {movies.filter((movie) => movie.director.Name === selectedMovie.director.Name && movie.title !== selectedMovie.title).map((movie) => 
                            (   
                                <Col  className="m-3" md={3} key={movie.key}>    
                                    <SuggCard  
                                        movie={movie} 
                                        onMovieClick = {(movie)=> setSelectedMovie(movie)}/>
                                </Col>
                        )
                    )}
                    </Col>
                ) : selectedMovie ? (
                    <Col style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center' }} className="mt-3" md={8}>
                        <MovieView 
                            movie={selectedMovie}   
                            onBackClick={()=>setSelectedMovie(null)}
                            onDirectorClick={()=>setSelectedDirector(true)}
                        />
                        <hr />
                        <h2>Similar Movies</h2>
                        <Col style={{display: "flex", justifyContent:"center"}}>
                        { movies.filter((movie) => movie.genre.Name === selectedMovie.genre.Name && movie.title !== selectedMovie.title).map((movie) => 
                            (
                                <SuggCard
                                    
                                    key={movie.key}
                                    movie={movie} 
                                    onMovieClick = {(movie)=> setSelectedMovie(movie)}/>
                                
                            )
                            )}
                        
                        </Col>
                    </Col>
                ): (movies.length === 0) ? (
                    <Col>
                        <Button onClick ={()=>{setUser(null); setToken(null); localStorage.clear();}}> Logout</Button>
                        <div>No Movies to display!</div>
                    </Col>
                ): (
                    <>  
                        <Row>
                            <Col>
                                <Button className="mt-3" md={1} onClick ={()=>{setUser(null); setToken(null); localStorage.clear();}}> Logout</Button>
                            </Col>

                        </Row>
                        {movies.map((movie)=>(
                            <Col className="mb-3 mt-3" md={3} key={movie.key}>
                                <MovieCard
                                    movie = {movie}
                                    onMovieClick = {(movie)=> setSelectedMovie(movie)}
                                />
                            </Col>
                        ))}
                    
                    </>
                )} */}