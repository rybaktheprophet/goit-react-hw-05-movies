import { lazy,useState,useEffect } from 'react';
import { Link, Route, Routes, useParams, useLocation} from 'react-router-dom';
import css from "./MovieDetails.module.css";
import { getMovieById } from "services/MovieAPI";

const Cast = lazy(() => import('../../components/Cast/Cast'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));

function MovieDetails (){
    const { idMovie }  = useParams();
    
    const location = useLocation();  

    const [movie, setMovie ] = useState(null);
    
    useEffect(() => {getMovieById(idMovie).then((data) => {setMovie(data)})}, [idMovie])
    
      if (!movie){ return } 
  
      const genres = movie.genres.map(genre => genre.name).join(', ');
    return (
      <div className={css.general}>
        <div className={css.movieDetails}>
          <div className={css.movie}>
            <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.title}/>

            <div className={css.movieDescription}>  
              <div>
                <p><strong>Title: </strong>{movie.title}</p>
                <Link to={location.state?.from ?? "/movies"} ><button>Back</button></Link>
              </div>
              <p className={css.overView}><strong>Overview: </strong>{movie.overview}</p>
              {genres && <p><strong>Genres: </strong>{genres}</p> }
            </div>
          </div>
        
        <div className={css.movieAdd}>
          <Link to="cast" className={css.movieCast} state = {{ from: location.state?.from}}>
            <button>Cast</button>
          </Link>

          <Link to="reviews" className={css.movieReviews} state = {{ from: location.state?.from}}>
          <button>Reviews</button>
          </Link>
        </div>
      </div>
        
      <Routes>
        <Route path="cast" element={<Cast />} />
        <Route path="reviews" element={<Reviews />} />
      </Routes>
        </div>
    )
}

  export default MovieDetails;