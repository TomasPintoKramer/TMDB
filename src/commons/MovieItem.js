import React from "react";
import { Link } from "react-router-dom";

import {  FaStar } from "react-icons/fa";


const MovieItem = ({ movie, setFavs }) => {




  return (
    <Link
      to={`/single/${movie.first_air_date ? "tv" : "movie"}/${movie.id}`}
    >
    <div className="card" 
   
    >
      <div className="card-image">
        <figure className="has-ratio">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        
        <div className="content">
  
          
          <br />
          <strong>Rank: </strong> <>{movie.vote_average} <FaStar/></>
          <br />
          <time dateTime="2016-1-1">
            <strong>Release Date: </strong>
            {movie.release_date}
          </time>
        </div>
      </div>
    </div>
          </Link>
  );
};

export default MovieItem;
