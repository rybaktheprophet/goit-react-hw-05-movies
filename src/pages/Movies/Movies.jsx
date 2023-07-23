import { getMovieByQuery } from "services/MovieAPI";
import { useEffect, useState } from 'react';
import { MovieList } from "components/MoveList/MoveList";
import { useSearchParams } from 'react-router-dom';

import css from "./Movie.module.css"

function Movies (){

  const [searchMovies, setSearchMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const movieToSearch = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!movieToSearch) return;

    setSearchQuery(movieToSearch);
    getMovieByQuery(movieToSearch).then(({ results }) => {      
      setSearchMovies(results);
    });
  }, [movieToSearch]);

  const onFormSubmit = event => {
    event.preventDefault();
    setSearchParams({ query: searchQuery });
    
  };

    return ( 
    <div className={css.formStyle}>
        <form onSubmit={onFormSubmit} className={css.form}>
        <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            name="searchMovie"
            autoFocus
            placeholder="Search movie"
            onChange={e => setSearchQuery(e.target.value)}
          /> 
          <button type="submit"> Find </button>
        </form>
        <MovieList movies = {searchMovies}/>
    </div>
    )
} 

export default Movies;