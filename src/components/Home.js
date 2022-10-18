import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


// import * as functions from 'firebase-functions';

//const api = functions.config().youtube.key

// console.log(api)

const YT_URL = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + process.env.REACT_APP_YOUTUBE_CHANNEL_ID
+ "&key=" + 
process.env.REACT_APP_YOUTUBE_API_KEY

console.log(YT_URL)

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el))




export const Home = () => {
    return(
      <>
   <div className='home-text'>
   <div className='home-div hidden'>
    <h1> Welcome to A Million Pizza HQ</h1>
    <p> This is our website!</p>
    <p> wE cOdEd iT oUrSelvES</p>
    </div>

    <div className='home-div hidden'>
      <h1>Here you will find...</h1>
      <p>All things pizza! From tips and guides to making it yourself, 
        to fun videos and photos of our pizzas and pizza-related advntures</p>
    </div>


    <div className='home-div hidden'>
      <h1>If you're confused...</h1>
      <p>Keep scrolling to hear about who we are, and why we were dumb enough to
        try and make a custom site like this. Hint: We like to tinker and aren't that bright
      </p>
    </div>

    <div className='home-div hidden' >
      <h1>About Us.</h1>
      <p>A Million Pizza Challenge started in November 2021 when Jasper, an avid baker and lifelong dough boy, joked 
        to his friend Cooper, the smart, handosme one, that "it would be kinda fun to make a pizza every day, like that
        10,000 hours shit." Cooper didn't think that was funny, and told him it was a terrible idea. After going home for
        the holidays, Jasper came back with an even worse idea: Make a million pizzas and film the whole thing. After Cooper
        ran the numbers on this &#40; It would take about 2,000 years to make a million pizzas non-stop &#41; He suggested
        counting each view on the Youtube video as a pizza instead. 
      </p>
    </div>
    </div>
    </>
    )

    
}