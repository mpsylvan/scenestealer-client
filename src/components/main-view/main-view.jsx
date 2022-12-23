import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";


export const MainView = ()=>{
    const[movies, setMovies] = useState([
        {id:1, title: 'The Witch', director: {name:'Robert Eggers', img: 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQja2gK2N7Dnevdms-dlFCvK_ibp11vws7tN6dvoMx-jCWIU9jw43bbkAueerymiH-vu0XS27Lla0Aq9zg'}, releaseYear: 2016, genre: 'Horror', img: "https://upload.wikimedia.org/wikipedia/en/b/bf/The_Witch_poster.png", studio: 'A24', desc: '17th century puritans encounter a dark presence in the woods bordering their farm.'},
        {id:2, title: 'Knives Out', director: {name: 'Rian Johnson', img: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Star_Wars-_The_Last_Jedi_Japan_Premiere_Red_Carpet-_Rian_Johnson_%2838905282292%29_%28cropped%29.jpg'}, releaseYear: 2019, genre: 'Mystery', img: "https://upload.wikimedia.org/wikipedia/en/1/1f/Knives_Out_poster.jpeg", studio: 'Lionsgate Pictures', desc: 'When a wealthy author and patriarch dies mysteriously a charismatic detective is brought in to untangle the murder and a sinisterly funny family history.'},
        {id:3, title: 'Point Break', director: {name: 'Kathryn Bigelow', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Kathryn_Bigelow_by_David_Shankbone.jpg' }, releaseYear: 1991, genre: 'Action', img: "https://upload.wikimedia.org/wikipedia/en/7/7e/Pointbreaktheatrical.jpg", studio: '20th Century Fox', desc: "The film features Reeves as an undercover FBI agent who is tasked with investigating the identities of a group of bank robbers while he develops a complex relationship with the group's"},
    
     
    ]);
    const [selectedDirector, setSelectedDirector] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
            (<MovieCard key={movie.id} 
                movie={movie} 
                onMovieClick = {(movie)=> setSelectedMovie(movie)}/>
        ))}
        </div>
    );
     

};