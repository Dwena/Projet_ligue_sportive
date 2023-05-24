import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {MovieCard} from "./MovieCard";

export function MovieList() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        axios.get('http://localhost:8000/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => console.error(error));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (search === '') {
            fetchMovies();
        } else fetchMoviesByTitle();
    }

    const fetchMoviesByTitle = async () => {
        axios.get(`http://localhost:8000/movies/${search}`)
            .then(response => {
                setMovies([response.data]);
            })
            .catch(error => console.error(error));
    }

    return (
        <div className='App'>
            <div className="content">
                <header>
                    <nav className="nav">
                        <img style={{width: '90px', borderRadius: '50%', margin: '10px'}}
                             src='https://img.freepik.com/vecteurs-premium/logo-popcorn_9845-76.jpg'
                             alt='logo'/>
                        <Link className='link' to="/">Accueil</Link>
                    </nav>
                </header>
                <main className='main-content'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="search">Rechercher un film </label>
                        <input onChange={(e) => setSearch(e.target.value)} className='input-text' type="text"
                               id="search" name="search"/>
                        <input className='input-button' type="submit"
                               value="Rechercher"/>
                    </form>
                    <div className="movie-list">
                        <MovieCard movies={movies}/>
                    </div>
                </main>
            </div>
            <div className="footer">
                <footer>
                    <a href="https://github.com/MonnPoup">Lucas Monnet-Poupon</a>
                </footer>
            </div>
        </div>
    )
}
