import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import * as functions from 'firebase-functions';

// const api = functions.config().youtube.key

// console.log(api)

const YT_URL = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + process.env.REACT_APP_YOUTUBE_CHANNEL_ID
+ "&key=" + 
process.env.REACT_APP_YOUTUBE_API_KEY

console.log(YT_URL)

export const Home = () => {
    return(
      <>
    <h1> Welcome to A Million Pizza</h1>
    <h3> This is where things get serious...</h3>
    <p>This site will hopefully help organize all things relating to A Million Pizza and beyond. Within these hallowed pages we will provide you with videos to watch, photos to look through (with the option of submitting your own!) and plenty of resources to help you on your own pizza journey.</p>
   <br></br>
   <h2>To Do:</h2>
    <FormGroup>
      <FormControlLabel control={<Checkbox />} label="Add giant total views count" />
      <FormControlLabel control={<Checkbox />} label="Add styling" />
      <FormControlLabel control={<Checkbox />} label="Add Logo" />
      <FormControlLabel control={<Checkbox />} label="Realize there are better libraries already made for this and switch to those" />
    </FormGroup> 
    </>
    )
}