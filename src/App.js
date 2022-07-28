import React, {useState}from "react";
import { Routes , Route, Navigate } from "react-router";
import Navbar from './components/Navbar'
import Content from "./components/Content";
import SearchBar from "./commons/SearchBar";
import NewUser from './components/NewUser'
import LogIn from "./components/LogIn";
import UserView from "./components/UserView.js";
import NotFound from "./commons/NotFound";
import UserProfile from "./components/UserProfile";

const App = () => {
  const [favs, setFavs]=useState([])
  return (
    <>
    <Navbar />
  <Routes>
    <Route path={"/"||"/search/:value"} element={<SearchBar  setFavs={setFavs}/>}/>
    <Route path={"/search/:value"} element={<SearchBar setFavs={setFavs}/>}/>
    <Route path='/signUp' element={<NewUser/>}/>
    <Route path='/logIn' element={<LogIn/>}/>
    <Route path='/your_profile/:userid' element={<UserProfile />}/>
    <Route path='/favourites/:userid'element={<UserView favs={favs} setFavs={setFavs}/>}/>
    <Route path='/single/:media/:id' element={<Content/>}/>
    <Route path='/404' element={<NotFound/>}/>
    <Route path="*" element={<Navigate to="404" />} />
  </Routes>
    </>
  );
};

export default App;

