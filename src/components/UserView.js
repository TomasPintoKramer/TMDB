import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import MovieListItem from "../commons/MovieListItem";
import { AuthContext } from "../store/context/AuthContext";

const UserView = ({favs, setFavs}) => {
console.log("🚀 ~ file: UserView.js ~ line 7 ~ UserView ~ setFavs", setFavs)
  const { user } = useContext(AuthContext);
 
  const [movies, setMovies] = useState([]);
 

  useEffect(() => {
    axios
      .get(`/api/users/collection/${user.id}`)
      .then((r) => setMovies(r.data))
      .catch((err) => console.log(err));
  }, [favs]);

  return (
    <>
      <div className="container is-fluid collection">
        <div className="notification is-info">
          This are <strong>your favourite's </strong>movies and tv shows.
        </div>
      </div>
      <MovieListItem movies={movies} setFavs={setFavs}  />
    </>
  );
};
export default UserView;
