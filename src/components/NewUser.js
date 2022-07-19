import axios from "axios";
import React, { useState, useContext } from "react";
import useInput from "../hooks/formHook";
import { useNavigate } from "react-router";
import { AuthContext } from "../store/context/AuthContext";

const NewUser = () => {
  const name = useInput();
  const userName = useInput();
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const { toggleAuth } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("api/users/register", {
        name: name.value,
        userName: userName.value,
        email: email.value,
        password: password.value,
      })
      .then((res) => toggleAuth(res.data))
      .then(() => navigate("/"))
      .catch((err) => alert(err.response.data));
  };
  const checkHandler = (e) => {
    setCheck(e.target.checked);
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="field user">
          <h1 className="title center">Welcome!</h1>
          <div>
            <label className="label">Name</label>
            <div className="control has-icons-left has-icons-right">
              <input
                {...name}
                className="input"
                type="text"
                placeholder="Your name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <input
                {...userName}
                className={`input`}
                type="text"
                placeholder="Your @username"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                {...email}
                className={`input`}
                type="email"
                placeholder="Your mail@mail.com"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
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
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" onClick={checkHandler} />I agree to the{" "}
                <a href="https://www.lipsum.com/">terms and conditions</a>
              </label>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button
                disabled={!check && "true"}
                type="submit"
                className="button is-link"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewUser;
