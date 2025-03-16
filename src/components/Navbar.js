import { db, app, functions } from "./firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
//import { display } from "@mui/system";
import { responsiveFontSizes } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
//import { response } from "express";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/Logo.png";
import React, { useState, useEffect, useRef } from "react";
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
  setDoc
} from "firebase/firestore";

// Milestone thresholds and their messages
const MILESTONES = {
  7500: "Wow! 7,500 pizzas! 🎉",
  10000: "10K pizzas! Amazing! 🍕",
  15000: "15K milestone reached! 🎊",
  20000: "20K pizzas and counting! 🎯",
  50000: "Halfway to 100K! 🚀",
  100000: "100K pizzas! Incredible! 🏆",
};

export default function Navbar() {
  const [count, setCount] = useState('...');
  const [displayCount, setDisplayCount] = useState('...');
  const [error, setError] = useState(null);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneMessage, setMilestoneMessage] = useState('');
  const previousCount = useRef(null);
  const animationTimeoutRef = useRef(null);

  // Animate count changes
  const animateCount = (start, end) => {
    const duration = 1000; // 1 second animation
    const steps = 20;
    const stepDuration = duration / steps;
    const increment = (end - start) / steps;
    let current = start;
    let step = 0;

    const animate = () => {
      current += increment;
      step++;
      
      if (step === steps) {
        setDisplayCount(end.toString());
      } else {
        setDisplayCount(Math.round(current).toString());
        animationTimeoutRef.current = setTimeout(animate, stepDuration);
      }
    };

    animate();
  };

  // Check for milestones
  const checkMilestone = (newCount) => {
    const milestones = Object.keys(MILESTONES).map(Number);
    for (const milestone of milestones) {
      if (previousCount.current < milestone && newCount >= milestone) {
        setMilestoneMessage(MILESTONES[milestone]);
        setShowMilestone(true);
        setTimeout(() => setShowMilestone(false), 5000); // Hide after 5 seconds
        break;
      }
    }
  };

  // Test function to update count
  const testCountUpdate = async () => {
    try {
      const currentCount = Number(count) || 7425;
      const newCount = currentCount + 1;
      await setDoc(doc(db, "viewCount", "Count"), { "View Count": newCount });
      console.log('Updated count to:', newCount);
    } catch (error) {
      console.error('Error updating count:', error);
    }
  };

  useEffect(() => {
    // Get cached count if available
    const cachedCount = localStorage.getItem('viewCount');
    if (cachedCount) {
      setCount(cachedCount);
      setDisplayCount(cachedCount);
      previousCount.current = Number(cachedCount);
    }

    // Subscribe to real-time updates
    const unsub = onSnapshot(doc(db, "viewCount", "Count"), 
      (doc) => {
        if (doc.exists()) {
          const newCount = doc.get("View Count");
          
          // Clear any existing animation
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
          }

          // Animate from previous to new count
          if (previousCount.current !== null && newCount !== previousCount.current) {
            animateCount(previousCount.current, newCount);
            checkMilestone(newCount);
          } else {
            setDisplayCount(newCount.toString());
          }

          setCount(newCount);
          setError(null);
          previousCount.current = newCount;
          localStorage.setItem('viewCount', newCount);
        } else {
          setCount('--');
          setDisplayCount('--');
          setError('No count available');
        }
      },
      (error) => {
        console.error("Error fetching count:", error);
        setCount('--');
        setDisplayCount('--');
        setError('Error fetching count');
      }
    );

    return () => {
      unsub();
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navTop">
        <div className="navIcon">
          <Link to="/">
            <img
              className="image-link"
              src={logo}
              alt="A Million Pizza Logo"
            />
          </Link>
        </div>
        <div className="countBox">
          <p className="pizzaCount">
            Pizza Count: {displayCount}
          </p>
          {showMilestone && (
            <div className="milestone-popup">
              {milestoneMessage}
            </div>
          )}
          {window.location.hostname === 'localhost' && (
            <button 
              onClick={testCountUpdate}
              style={{
                padding: '5px 10px',
                marginTop: '5px',
                background: '#F6BC65',
                border: '1px solid #81171B',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '14px',
                textShadow: '1px 1px #81171B'
              }}
            >
              Test Count Update
            </button>
          )}
        </div>
        <a href="https://github.com/jasper-gordon/A-Million-Pizza" className="git-container">
          <img className="git-link" src={git_logo} alt="Github Logo" />
        </a>
      </div>
      <div className="nav-flex">
        <Link to="/pizzas" className="navLink">Pizzas</Link>
        <Link to="/videos" className="navLink">Videos</Link>
        <Link to="/tips" className="navLink">Tips</Link>
        <Link to="/dough-calculator" className="navLink">Dough Calculator</Link>
      </div>
    </nav>
  );
}
