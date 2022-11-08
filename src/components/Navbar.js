import { functions } from "./firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
//import { display } from "@mui/system";
import { responsiveFontSizes } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
//import { response } from "express";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/Logo.png";
import React, { useState } from "react";
import { resolveComponentProps } from "@mui/base";
import git_logo from "../assets/GitHub-Mark-32px.png";
// import { randomNumberGen } from '../../functions';

// const addMessage = httpsCallable(functions, 'addMessage');

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// const functions = getFunctions();

const getRandom = httpsCallable(functions, "randomNumberGen");
console.log("Calling!");
getRandom("hello")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("We have a problem");
  });

export default function Navbar() {
  const [count, setCount] = React.useState(0);
  

  const getViewCount = httpsCallable(functions, "getViews");
getViewCount("hello")
  .then((result) => {
    setCount(result.data);
  })
  .catch((error) => {
    console.log("We have a problem with views:" + error);
  });
  // //Requesting YouTube View data from backend server
  // const getViews = async() => {
  //     const response = await fetch("http://localhost:8000/views")
  //     const finalData = await (response.text())
  //     let data = await (JSON.parse(finalData))
  //     //Updating state with view count
  //     setCount(data.items[0].statistics.viewCount)

  // }

  //console.log('data', res);
  //getViews()

  //document.getElementById("data").innerHTML = data;

  return (
    <nav className="navbar">
      <div className="navTop">
        <div className="navIcon">
          <Link to="/">
            <img
              className="image-link"
              src={logo}
              alt="A Million Pizza Logo"
            ></img>
          </Link>
        </div>
        <div className="countBox">
          <p className="pizzaCount">Pizza Count: {count}</p>
        </div>

        <div style={{ float: "right" }}>
          <a href="https://github.com/jasper-gordon/A-Million-Pizza">
            <img className="git-link" src={git_logo} alt="Github Logo"></img>
          </a>
        </div>
      </div>
      <div className="nav-flex">
        <Link to="/pizzas" className="navLink">
          {" "}
          Pizzas
        </Link>
        <Link to="/videos" className="navLink">
          {" "}
          Videos
        </Link>
        <Link to="/tips" className="navLink">
          {" "}
          Tips
        </Link>
      </div>
    </nav>
  );
}
