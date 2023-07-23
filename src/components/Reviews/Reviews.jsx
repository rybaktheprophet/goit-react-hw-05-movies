import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import css from "./Reviews.module.css"
import { getReviewById } from 'services/MovieAPI';

function Reviews () {
    const { idMovie } = useParams();
    const [ reviewInfo, setReviewInfo] = useState();
  

  const getReview = async idMovie => {
     
      const { results }  = await getReviewById(idMovie);
      setReviewInfo(results);

  };

  useEffect(() => {
    getReview(idMovie)
  }, [idMovie]);


  if (!reviewInfo) {
    return null;
  }
  return (
     <>
      {reviewInfo.length > 0 ? (
     <ul>
     {reviewInfo.map(({id, author, content}) => {
        return (
            <li key={id} className={css.reviewContainer}>
                <b className={css.authorName}>Author: {author}</b>
                <div className={css.ContentContainer}>
                  <p className={css.ContentTitle}>Content:</p>
                  <span className={css.Content}>{content}</span>
                </div>
         </li>
         )
     })} 
     </ul>) : (
     <p className={css.noReview}>Oops!There are no such reviews!</p> 
     )}
     </>
)
}

export default Reviews;