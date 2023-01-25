import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import {LoginView} from "../login-view/login-view"
import { SignupView } from "../signup-view/signup-view";
import {NavigationBar} from "../navbar-view/navbar-view";
import { ProfileView } from "../profile-view/profile-view";
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
            <Row style={{justifyContent:'center'}}  className="justify-content-md-center">
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
                                            <LoginView onLoggedIn={(user, token)=>{setUser(user); setToken(token);}}/>
                                        </Col>
                                    )}
                            </>
                        }
                    />
                    <Route
                        path = "/profile"
                        element = {
                            <>
                                {!user ? (
                                    <Navigate to = "/login"/>
                                    
                                ) : (
                                    <Col md = {10}>
                                        <ProfileView
                                            user = {user}
                                            movies = {movies}
                                            token = {token}
                                        />
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
                                   <Col style={{display:"flex", justifyContent:"center"}} md = {8}>
                                        <MovieView 
                                            movies = {movies}
                                            user = {user}
                                        />
                                   </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="directors/:directorName"
                        element = {
                            <>
                                {!user ? (
                                    <Navigate to= "/login" replace />
                                ):(
                                    <DirectorView movies={movies}/>
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
    
    

