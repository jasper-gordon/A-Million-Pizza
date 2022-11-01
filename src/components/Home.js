import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useRef } from 'react';
import street_pic from '../assets/street_pizza_photo.png';
import fire from '../assets/fire.png';
import dough from '../assets/dough.png';
import oven from '../assets/oven.png';
import finsihed_pizza from '../assets/finished.png';
import youtube_logo from '../assets/youtube.png';
import {Link} from "react-router-dom";
import down_arrow from '../assets/down_arrow.png';


export const Home = () => {
    const ref = useRef();
  return(
      <>
   <div>
     
      <Parallax pages={6} ref={ref}> 
    
        <ParallaxLayer 
        speed={0}
        offset={0}
        className={'homeImage'}
        style={{
            backgroundImage: `url(${fire})`,
            backgroundSize: 'cover',
        }}>
        </ParallaxLayer>


        <ParallaxLayer 
        speed={1}
        offset={0}>
        <div className='home-title-box'>
        <h1 className='home-title'> Welcome to A Million Pizza</h1>
        </div>
        </ParallaxLayer>

        <ParallaxLayer 
        speed={0}
        offset={1}
        className={'homeImage'}
        style={{
            backgroundImage: `url(${dough})`,
            backgroundSize: 'cover',
        }}>
        </ParallaxLayer>


        <ParallaxLayer 
        speed={1}
        offset={.8}>
        <div className='home-div1'>
        <h1 className='home-subheader'> Our Mission</h1>
        <p className='home-paragraph'> To explore all things pizza, to learn and develop our understanding, and to share it with you! </p>
        </div>
        </ParallaxLayer>
       
       
        <ParallaxLayer 
        speed={0}
        offset={2}
        className={'homeImage'}
        style={{
            backgroundImage: `url(${oven})`,
            backgroundSize: 'cover',
        }}>
        </ParallaxLayer>
       

        <ParallaxLayer 
        speed={1}
        offset={1.5}>
        <div className='home-div1'>
        <h1 className='home-subheader'> The Challenge</h1>
        <p className='home-paragraph'> No great website is without a side quest, ours is simple: reach 1,000,000 views on our youtube videos. Curious? Keep scrolling to find out or click that big red button 👇
        </p>
        </div>
        </ParallaxLayer>


        <ParallaxLayer 
        speed={1}
        offset={2.5}>
        <div>
        <a href='https://www.youtube.com/channel/UC55OAzN0TXMQsMAfGi_jYVQ'>
            <img className='youtube-icon'  src={youtube_logo} alt="Youtube Logo"></img>
        </a>
        </div>
        </ParallaxLayer>

        <ParallaxLayer 
        speed={0}
        offset={3}
        className={'homeImage'}
        style={{
            backgroundImage: `url(${finsihed_pizza})`,
            backgroundSize: 'cover',
        }}>
        </ParallaxLayer>


        <ParallaxLayer 
        speed={1}
        offset={3.3}>
        <div className='home-div1'>
        <h1 className='home-subheader'> The Guides</h1>
        <p className='home-paragraph'> As lifelong pizza makers we have made plenty of mistakes (ever had yeast-less pizza?), which is why we're developing a set of guides and resources to help you whether it's to plan your next pizza party, or to understand why the last one might not have go so well... 
        </p>
        </div>

        <Link to='/tips'>
        <h1 className='home-tips-box'> Pizza Tips!</h1>
        </Link>
        </ParallaxLayer>

        <ParallaxLayer 
        speed={0}
        offset={4}
        className={'homeImage'}
        style={{
            backgroundImage: `url(${street_pic})`,
            backgroundSize: 'cover',
        }}>
        </ParallaxLayer>


        <ParallaxLayer 
        speed={0}
        offset={4.5}>
        <div className='home-div1'>
        <h1 className='home-subheader'> Still curious?</h1>
        </div>

        </ParallaxLayer>

        <ParallaxLayer 
        speed={0}
        offset={4.95}
        >
        <img src={down_arrow} className="down-arrow"></img>
        </ParallaxLayer> 

         <ParallaxLayer 
        speed={0}
        offset={5}
        style={{
            backgroundColor: '#C75146',
        }}
        >
        <h1 className='home-title'>
            About Us
        </h1>
        <p className='home-about'>
        A Million Pizza Challenge started in November 2021 when Jasper, an avid baker and lifelong dough boy, joked  to his friend Cooper, the smart, handsome one, that "it would be kinda fun to make a pizza every day, like do the whole 10,000 hours thing." Cooper didn't think that was funny, and told him it was a terrible idea. After going home for the holidays, Jasper came back with an even worse idea: Make a million pizzas and film the whole thing. After Cooper ran the numbers on this (It would take about 2,000 years to make a million pizzas one at a time non-stop) He suggested counting each view on the Youtube video as a pizza instead. 
        </p>
        </ParallaxLayer>
        </Parallax> 
 </div>
   </>
  )
}