import { useState, useEffect } from "react";

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// 508fce71 API Key
const API_URL = 'http://www.omdbapi.com?apikey=508fce71';

const App = () => {

    const [movies, setMovies] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        if (title == '') {
            alert('Search Box Empty')
            return;
        } else {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            setMovies(data.Search);
            console.log(movies);
        }
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className="app">
            <h1>Movie Land</h1>
            <div className="search">
                <input
                    placeholder="Search Movies"
                    value={searchTerm}
                    onChange={(e)=>{ setSearchTerm(e.target.value)}}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={(e)=>{searchMovies(searchTerm)}}
                />
            </div>
            {movies?.length > 0
                ? (
                    <div className="container">
                        {
                            /* <MovieCard movie1={movies[0]} /> */
                            movies.map((movie) => (
                                <MovieCard movie={movie} key={movie['imdbID']} />  
                            ))
                        }
                        
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )}
        </div>
    );

}

export default App;