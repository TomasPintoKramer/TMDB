import React from "react";
import MovieItem from "./MovieItem";

const MovieListItem = ({ movies, setFavs }) => {
  return (
    <div style={{margin:'3em'}} className="columns is-multiline layout">
      {movies?.map((movie, i) => (
        <div className="column is-2" key={i}>
          <MovieItem movie={movie} setFavs={setFavs} />{" "}
        </div>
      ))}
    </div>
  );
};

export default MovieListItem;
