import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import {LoginView} from "../login-view/login-view"
import { SignupView } from "../signup-view/signup-view";
import {NavigationBar} from "../navbar-view/navbar-view";
import { ProfileView } from "../profile-view/profile-view";
import {Row, Col, Button} from 'react-bootstrap';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
// useDispatch to dispatch action creators, useSelector to get states
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser, setToken} from "../../redux/reducers/users/user";
import { MoviesList } from "../movies-list/movies-list";
import { saveState } from '../../localStorage';
import { store } from "../../redux/store";



export const MainView = ()=>{
    //uses local storage to access user/token items set via a successful login and stores them as variables to persist auth state. 
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    // dispatch to hook into store reducers
    const dispatch = useDispatch(); 
    
    // assign variables of user/token to stored state
    const user = useSelector((state)=>state.user.user);
    const token = useSelector((state)=>state.user.token);

    
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
                dispatch(setMovies(movieData));
                
            })
        }, [token])
        

   
    
    return (
        <BrowserRouter>
            <NavigationBar/>
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
                                            <LoginView />
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
                                        <ProfileView/>
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
                                    ) : (
                                   <Col style={{display:"flex", justifyContent:"center"}} md = {8}>
                                        <MovieView />
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
                                    <DirectorView/>
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
                                ) : 
                                    <MoviesList/>
                                }
                            </>
                        }
                    />
                </Routes>        
            </Row>
           </BrowserRouter>
        );
    };
    