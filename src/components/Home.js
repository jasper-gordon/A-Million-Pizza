/**
 * Home component that creates a parallax scrolling landing page.
 * Features multiple sections with background images, videos, and content
 * about the pizza-making journey.
 * 
 * @component
 */

import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useRef } from 'react';
import { Link } from "react-router-dom";

// Image imports
import streetPic from '../assets/street_pizza_photo.png';
import dough from '../assets/dough.png';
import oven from '../assets/oven.png';
import finishedPizza from '../assets/finished.png';
import downArrow from '../assets/down_arrow.png';
import homePageVideo from '../assets/home-page-vid.mov';

/**
 * Content sections for the parallax layout
 */
const SECTIONS = {
  HERO: {
    offset: 0,
    speed: 1,
  },
  MISSION: {
    offset: 0.9,
    speed: 1,
    background: {
      offset: 1,
      image: dough,
    },
  },
  CHALLENGE: {
    offset: 1.5,
    speed: 1,
    background: {
      offset: 2,
      image: oven,
    },
  },
  GUIDES: {
    offset: 3.3,
    speed: 1,
    background: {
      offset: 3,
      image: finishedPizza,
    },
  },
  ABOUT: {
    offset: 4.5,
    speed: 0,
    background: {
      offset: 4,
      image: streetPic,
    },
  },
};

export const Home = () => {
  const parallaxRef = useRef();

  return (
    <div className="home-container">
      <Parallax pages={6.5} ref={parallaxRef}>
        {/* Hero Section with Video Background */}
        <ParallaxLayer speed={0} offset={SECTIONS.HERO.offset}>
          <video 
            className="videoHome" 
            autoPlay 
            loop 
            muted 
            playsInline
            aria-label="Background video showing pizza making process"
          >
            <source src={homePageVideo} type="video/mp4" />
          </video>
        </ParallaxLayer>

        <ParallaxLayer speed={SECTIONS.HERO.speed} offset={SECTIONS.HERO.offset}>
          <div className="home-title-box">
            <h1 className="home-title">
              Welcome to <br /> A Million Pizza
            </h1>
          </div>
        </ParallaxLayer>

        {/* Mission Section */}
        <ParallaxLayer 
          speed={0} 
          offset={SECTIONS.MISSION.background.offset}
          className="homeImage"
          style={{
            backgroundImage: `url(${SECTIONS.MISSION.background.image})`,
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer speed={SECTIONS.MISSION.speed} offset={SECTIONS.MISSION.offset}>
          <div className="home-div1">
            <h2 className="home-subheader">Our Mission</h2>
            <p className="home-paragraph">
              To explore all things pizza, to learn and develop our understanding, and to share it with you!
            </p>
          </div>
        </ParallaxLayer>

        {/* Challenge Section */}
        <ParallaxLayer 
          speed={0} 
          offset={SECTIONS.CHALLENGE.background.offset}
          className="homeImage"
          style={{
            backgroundImage: `url(${SECTIONS.CHALLENGE.background.image})`,
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer speed={SECTIONS.CHALLENGE.speed} offset={SECTIONS.CHALLENGE.offset}>
          <div className="home-div1">
            <h2 className="home-subheader">The Challenge</h2>
            <p className="home-paragraph">
              Make 1,000,000 pizzas. <br /><br />
              It might take a while (we only have ☝️ oven, people), so for now, every YouTube view = 1 pizza. Help us hit a million so Jasper can rest his poor back, the kitchen stops drowning in flour (no, Choezin, you're probably just allergic to something else), and the ants stop thinking they run this place. Please help.
              <br /><br />
              Still confused? Keep scrolling or smash that big red button 👇
            </p>
          </div>
        </ParallaxLayer>

        {/* YouTube Button */}
        <ParallaxLayer speed={1} offset={2.5}>
          <a 
            href="https://www.youtube.com/channel/UC55OAzN0TXMQsMAfGi_jYVQ"
            className="youtube-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our YouTube channel"
          >
            <h2 className="red-button">Pizza Videos</h2>
          </a>
        </ParallaxLayer>

        {/* Guides Section */}
        <ParallaxLayer 
          speed={0} 
          offset={SECTIONS.GUIDES.background.offset}
          className="homeImage"
          style={{
            backgroundImage: `url(${SECTIONS.GUIDES.background.image})`,
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer speed={SECTIONS.GUIDES.speed} offset={SECTIONS.GUIDES.offset}>
          <div className="home-div1">
            <h2 className="home-subheader">The Guides</h2>
            <p className="home-paragraph">
              As lifelong pizza makers, we've made <em>plenty</em> of mistakes (ever tried yeast-less pizza? We wouldn't recommend it), which is why we're developing a set of guides and resources to help you wherever you are on your pizza journey!
            </p>
          </div>

          <Link to="/tips" className="tips-link" aria-label="View pizza making tips">
            <h2 className="home-tips-box">Pizza Tips!</h2>
          </Link>
        </ParallaxLayer>

        {/* About Section */}
        <ParallaxLayer 
          speed={0} 
          offset={SECTIONS.ABOUT.background.offset}
          className="homeImage"
          style={{
            backgroundImage: `url(${SECTIONS.ABOUT.background.image})`,
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer speed={SECTIONS.ABOUT.speed} offset={SECTIONS.ABOUT.offset}>
          <h2 className="home-subheader" style={{ fontSize: "40px" }}>
            Still curious?
          </h2>
        </ParallaxLayer>

        <ParallaxLayer speed={0} offset={4.95}>
          <img src={downArrow} alt="Scroll down for more" className="down-arrow" />
        </ParallaxLayer>

        <ParallaxLayer 
          speed={0}
          offset={5}
          factor={1.5}
          style={{
            backgroundColor: '#C75146',
          }}
        >
          <div className="about-section">
            <h2 className="home-title">About Us</h2>
            <p className="home-about">
            A Million Pizza Challenge began in November 2021 when Jasper, a lifelong dough boy and cheese pizza enjoyer, told his friend Cooper—the smart and handsome one—that he wanted a new challenge to elevate his pizza-making skills. Half-joking, he tossed out that "It'd be kinda fun to make a pizza every day, you know, do the whole 10,000 hours thing."
            <br /><br />
            Cooper did not think that was funny. In fact, he said it was a terrible idea.
            <br /><br />
Then Jasper went home for the holidays and came back with an even worse one: Make a million pizzas and film the whole thing. After Cooper ran the numbers (turns out, making a million pizzas one at a time non-stop would take roughly 2,000 years), he offered up a good idea of his own (for once): count each YouTube view as a pizza instead.
Jasper, not yet ready to devote his entire existence to the holy pie, agreed and set off on a mission that would be easy, require no hard work, and would eventually inspire tens of people to look at his resume and shrug. It would also be a lot of fun :)
            </p>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};