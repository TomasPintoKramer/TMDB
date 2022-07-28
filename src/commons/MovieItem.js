import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import {  FaStar } from "react-icons/fa";
import { AuthContext } from "../store/context/AuthContext";
import { FaTrash} from 'react-icons/fa'
import { FcLike} from 'react-icons/fc'
import swal from 'sweetalert';


const MovieItem = ({ movie, setFavs }) => {
  const { user } = useContext(AuthContext);
  // const [positive, setPositive]=useState(false)
  // const [negative, setNegative]=useState(false)
  const addToFavourites = (item) => {
    axios
      .put(`/api/users/${user.id}/add_favourites`, item)
      .then((result)=> setFavs(result))
       .then(() => swal("Added!", `${item.title} is in your favourites`, "success"))
      .catch((err) => console.log(err));
  };

  const deleteFromFavourites = (item) => {
    axios
      .put(`/api/users/${user.id}/delete_favourites`, item)
      .then((result)=> setFavs(result))
      .then(() => swal("Deleted!", `You deleted ${item.title} from your favourites`, "info")) 
      .catch((err) => console.log(err));
  };


  return (
    <div className="card">
    <Link
      to={`/single/${movie.first_air_date ? "tv" : "movie"}/${movie.id}`}
    >
      <div className="card-image">
        <figure className="has-ratio">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt="Placeholder image"
          />
        </figure>
      </div>
          </Link>
      <div className="card-content">
        <div className="media">
        <div className="media-left">
            {user && <FcLike onClick={() => addToFavourites(movie)} />}
          </div>
          <div className="media-right">
            {user && <FaTrash onClick={() => deleteFromFavourites(movie)} />}
          </div>
        </div>
        <div className="content">
         
          <strong>Rank: </strong> <>{movie.vote_average} <FaStar/></>
          {/* <br />
          <time dateTime="2016-1-1">
            <strong>Release Date: </strong>
            {movie.release_date}
          </time> */}
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
