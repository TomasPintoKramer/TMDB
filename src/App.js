import React from "react";
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
  return (
    <>
    <Navbar />
  <Routes>
    <Route path={"/"||"/search/:value"} element={<SearchBar/>}/>
    <Route path={"/search/:value"} element={<SearchBar/>}/>
    <Route path='/signUp' element={<NewUser/>}/>
    <Route path='/logIn' element={<LogIn/>}/>
    <Route path='/your_profile/:userid' element={<UserProfile/>}/>
    <Route path='/favourites/:userid'element={<UserView/>}/>
    <Route path='/single/:media/:id' element={<Content/>}/>
    <Route path='/404' element={<NotFound/>}/>
    <Route path="*" element={<Navigate to="404" />} />
  </Routes>
    </>
  );
};

export default App;

