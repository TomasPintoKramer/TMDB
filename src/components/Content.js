import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { FaHeart, FaTrash} from 'react-icons/fa'
import { AuthContext } from "../store/context/AuthContext";

const Content = () => {
  const { id, media } = useParams();
 
  const [data, setData] = useState({});


  useEffect(() => {
    axios
      .get(`/api/movies/single/${media}/${id}`)
      .then((r) => setData(r.data))
      .catch((err) => console.log(err));
  }, []);

  

  return (
    <>
      <article className="media collection">
        <figure className="media-left">
          <p className="image is-128x128">
            <img
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt='cualquiercosa'
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <h1>
              <strong>{data.original_title || data.name}</strong>
            </h1>
          </div>
         
          <article className="media">
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>Description </strong>
                  {data.overview}
                </p>
              </div>

              <article className="media">
                <div className="content">
                  <p>
                    <strong>Popularity </strong>
                    {data.popularity}
                  </p>
                </div>
              </article>
              <article className="media">
                <div className="content">
                  <p>
                    <strong>Release Date </strong>
                    {data.release_date || data.first_air_date}
                  </p>
                </div>
              </article>
            </div>
          </article>
          {data.original_title ? (
            <>
              <article className="media">
                <div className="content">
                  <p>
                    <strong>Budget </strong>$ {data.budget}
                  </p>
                </div>
              </article>
              <article className="media">
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>Revenue </strong>
                      {data.revenue}
                    </p>
                  </div>
                </div>
              </article>
            </>
          ) : (
            <>
              <article className="media">
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>Number of episodes </strong>
                      {data.number_of_episodes}
                    </p>
                  </div>
                </div>
              </article>
              <article className="media">
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>Number of Seasons </strong>
                      {data.number_of_seasons}
                    </p>
                  </div>
                </div>
              </article>
            </>
          )}

          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Runtime </strong>
                  {data.runtime || data.episode_run_time} minutes
                </p>
              </div>
            </div>
          </article>
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Tagline </strong>
                  {data.tagline}
                </p>
              </div>
            </div>
          </article>
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Vote Average </strong>
                  {data.vote_average}
                </p>
              </div>
            </div>
          </article>
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Vote Count </strong>
                  {data.vote_count}
                </p>
              </div>
            </div>
          </article>
        </div>
      </article>
    </>
  );
};
export default Content;
