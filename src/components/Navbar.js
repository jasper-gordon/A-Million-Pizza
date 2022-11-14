import { db, app, functions } from "./firebase";
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
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  getDocFromCache,
} from "firebase/firestore";

export default function Navbar() {
  const [count, setCount] = React.useState('');

  const unsub = onSnapshot(doc(db, "viewCount", "Count"), (doc) => {
    setCount(doc.get("View Count"));
  });

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
