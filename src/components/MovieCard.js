import axios from "axios";

export function MovieCard(movies) {

    const handleClick = (id) => {
        axios.delete(`http://localhost:8000/movies/${id}`)
            .then(response => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            {movies.movies.map(movie => (
                <div className='movie-card' key={movie._id}>
                    <div className='movie-card-content'>
                        <h2>{movie.title}</h2>
                        <p><strong>Année de sortie : </strong>{movie.year}</p>
                        <p><strong>Durée : </strong>{movie.runtime}</p>
                        <div style={{display: 'flex'}}>
                            <p><strong> Genre :</strong></p>
                            {movie.genres.map(genre => (<p key={genre}>{genre} </p>))}
                        </div>
                        <p><strong>Réalisateur : </strong>{movie.director}</p>
                        <p><strong>Acteurs : </strong>{movie.actors}</p>
                        <p><strong>Plot : </strong>{movie.plot}</p>
                        {movie.posterUrl === 'N/A' ? <p><strong>Poster : </strong>Non disponible</p> :
                            <img src={movie.posterUrl} alt={movie.title}/>}
                        <input style={{marginTop: '50px'}} onClick={() => handleClick(movie._id)} type="button"
                               value="Supprimer"/>
                    </div>
                </div>
            ))}
        </>
    )
}
