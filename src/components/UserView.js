import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import MovieListItem from "../commons/MovieListItem";
import { AuthContext } from "../store/context/AuthContext";

const UserView = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  

  useEffect(() => {
    axios
      .get(`/api/users/collection/${user.id}`)
      .then((r) => setMovies(r.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container is-fluid collection">
        <div className="notification is-info">
          This are <strong>your favourite's </strong>movies and tv shows.
        </div>
      </div>
      <MovieListItem movies={movies}  />
    </>
  );
};
export default UserView;
