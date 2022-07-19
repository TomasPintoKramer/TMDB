import axios from "axios";
import React, { useEffect, useState } from "react";
import useInput from "../hooks/formHook";
import MovieListItem from "./MovieListItem";
import { useNavigate } from "react-router";
import UserProfile from "../components/UserProfile";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { pathname } = useLocation();
  console.log(
    "🚀 ~ file: SearchBar.js ~ line 12 ~ SearchBar ~ location",
    pathname
  );
  const navigate = useNavigate();
  const search = useInput();
  const [result, setResult] = useState([]);
  const [trends, setTrends] = useState([]);
  const [media, setMedia] = useState("");

  useEffect(
    () =>
      axios
        .get("/api/movies/")
        .then((r) => setTrends(r.data.slice(0, 6)))
        .catch((err) => console.error(err)),
    []
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (media === "users") {
      axios
        .get(`/api/users/search/:${search.value}`)
        .then((r) =>
          r.data.length === 0 ? navigate("/404") : setResult(r.data)
        )
        .catch((err) => navigate("/404"));
    } else {
      axios
        .get(`/api/movies/${media}/:${search.value}`)
        .then((r) => {
          if (r.data.length === 0) {
            navigate("/404");
          } else {
            setResult(r.data);
            navigate(`/search/${search.value}`);
          }
        })
        .catch((err) => navigate("/404"));
    }
  };

  const clickHanlder = (e) => {
    setMedia(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="notification is-primary">
          <div
            className="field is-horizontal has-addons "
            style={{ width: "75%" }}
          >
            <div className="control search">
              <input
                {...search}
                className="input is-hovered "
                type="text"
                placeholder={`Find a ${media}...`}
              />
              {!media && (
                <strong className="help">Please select a category.</strong>
              )}
            </div>
            <div className="control">
              <button
                disabled={!media && "true"}
                type="submit"
                className="button is-info"
              >
                Search
              </button>
            </div>
          </div>
          <div className="control">
            <label className="radio">
              <input
                onClick={clickHanlder}
                type="radio"
                name="answer"
                value={"movie"}
              />
              Movie
            </label>
            <label className="radio">
              <input
                onClick={clickHanlder}
                type="radio"
                name="answer"
                value={"tv"}
              />
              Tv Show
            </label>
            <label className="radio">
              <input
                onClick={clickHanlder}
                type="radio"
                name="answer"
                value={"users"}
              />
              Users
            </label>
          </div>
        </div>
      </form>
      {pathname === "/"&& (<h1 class="subtitle thecolor" style={{fontWeight:700, fontSize:"34px" , marginLeft:"3em", marginTop:"2em"}}>Trends of the day</h1>)}
      {Array.isArray(result) ? (
        <MovieListItem movies={pathname === "/" ? trends : result} />
      ) : (
        <UserProfile user={result} />
      )}
    </div>
  );
};

export default SearchBar;
