import React, { useContext } from "react";
import MovieListItem from "../commons/MovieListItem";
import { AuthContext } from "../store/context/AuthContext";
import UserView from "./UserView";

import { useParams } from "react-router";

const UserProfile = ({ user }) => {
  const { userid } = useParams();
  const authUser = useContext(AuthContext);
  const profile = user || authUser.user;

  return (
    <>
      <div className="columns">
        <div className="column is-four-fifths user">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWbsg8yDJY7VfI7VyET08BjwA4I7vLQYJiTQ&usqp=CAU"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{profile?.name}</p>
                  <p className="subtitle is-6">@{profile?.userName}</p>
                </div>
              </div>

              <div className="content">
                <strong>Email:</strong> <a href={`mailto:${profile?.email}`}>{profile?.email}</a>
                <br />
                <strong>Joined us: </strong>
                <time dateTime="2016-1-1">
                  {profile?.createdAt.slice(0, 10)}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={userid ? "hero" : "hero is-info"}>
        <div className="hero-body">
          <h2 className="subtitle">
            <strong>Favourites:</strong>
          </h2>
        </div>
      </section>
      {userid ? <UserView /> : <MovieListItem movies={user?.favourites} />}
    </>
  );
};

export default UserProfile;
