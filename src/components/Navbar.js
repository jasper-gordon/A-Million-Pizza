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


// async function checker() {
//   const querySnap = await getDocs(collection(db, "viewCount"))
//   querySnap.forEach((doc) => {
//     console.log("made it here");
//     console.log(doc.id, " => ", doc.data());
//   });
// }

async function checker() {
const docRef = doc(db, "viewCount", "Count");
const docSnap = await getDoc(docRef);


if (docSnap.exists()) {
  return docSnap.get("View Count");
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
}

export default function Navbar() {
  const [count, setCount] = React.useState(0);

// checker()
//   .then((result) => {
//     setCount(result)
//   });
  


const unsub = onSnapshot(doc(db, "viewCount", "Count"), (doc) => {
    setCount(doc.get("View Count"));
});
  //   const getViewCount = httpsCallable(functions, "getViews");
  // getViewCount()
  //   .then((result) => {
  //     setCount(result.data);
  //   })
  //   .catch((error) => {
  //     console.log("We have a problem with views:" + error);
  //   });
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

  // const viewsCol = collection(db, 'viewCount');
  // const viewsSnapshot = getDocs(viewsCol);
  // console.log(viewsSnapshot);
  // db.firestore().collection('viewCount').get().then((snapshot) => {
  //     console.log(snapshot.docs)
  // });
  // const checkCount = onSnapshot(doc(db, "viewCount", "Count"), (doc) => {
  //     console.log("Current data: ", doc.data());
  // });

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
