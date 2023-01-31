import React from "react";
import {useSelector} from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { FavMovieCard } from "../fav-movie-card/fav-movie-card";
import { MoviesFilter } from "../movie-filter/movie-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = ()=>{
    const movies = useSelector((state)=>state.movies.list);
    const user = useSelector((state)=>state.user.user);
    const filter = useSelector((state)=>state.movies.filter).trim().toLowerCase();
    const filteredFavMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie.key) && movie.title.toLowerCase().includes(filter) );
    const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(filter) && !filteredFavMovies.includes(movie));

   

    return (
        <>
            <Row className="mb-3 mt-2t" >
                <MoviesFilter/>
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <h3>No movies to display !</h3>
                ):(
                    <>
                        {filteredFavMovies.map((movie)=>(
                            <Col className = "mb-4" key = {movie.key} md={3}>
                                <FavMovieCard 
                                    movie = {movie}
                                />
                            </Col>
                        ))}
                        {filteredMovies.map((movie)=>(
                            <Col className = "mb-4" key = {movie.key} md={3}>
                              <MovieCard 
                                    movie = {movie}
                                />
                            </Col>
                        ))}
                    </>  
                )}
            </Row>
        </>
    )
}