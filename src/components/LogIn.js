import React, { useContext } from "react";
import useInput from "../hooks/formHook";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../store/context/AuthContext";

const LogIn = () => {
  const navigate = useNavigate();
  const { toggleAuth } = useContext(AuthContext);
  const email = useInput();
  const password = useInput();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("api/users/login", { email: email.value, password: password.value })
      .then((r) => toggleAuth(r.data))
      .then(() => navigate("/"))
      .catch((err) => navigate("/404"));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="user">
        <h1 className="title center">Welcome back!</h1>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              {...email}
              className="input"
              type="email"
              placeholder="Email"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              {...password}
              className="input"
              type="password"
              placeholder="Password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button type="submit" className="button data is-success">
              Login
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LogIn;
